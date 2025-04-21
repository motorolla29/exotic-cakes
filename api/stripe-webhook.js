import { buffer } from 'micro';
import Stripe from 'stripe';
import { connectToDatabase } from './db.js';
import Order from '../models/Order.js';
import { sendOrderDetailsMail } from '../services/send-order-details/send-order-details-mail.js';

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

// Отключаем bodyParser (иначе raw тело запроса не получим)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log('🔔 Webhook endpoint hit:', req.method);

  if (req.method !== 'POST') {
    console.log('❌ Not a POST request');
    return res.status(405).send('Method Not Allowed');
  }

  // Подключаемся к базе
  await connectToDatabase();
  console.log('✅ Connected to DB');

  let event;

  try {
    const rawBody = await buffer(req);
    const sig = req.headers['stripe-signature'];

    console.log('🔒 Verifying Stripe signature...');
    // Проверяем подпись Stripe
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('✅ Stripe signature verified');
  } catch (err) {
    console.error('⚠️ Error verifying Stripe webhook signature:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Обрабатываем только событие "checkout.session.completed"
  if (event.type === 'checkout.session.completed') {
    console.log('💰 Checkout session completed');

    const session = event.data.object;

    const orderId = session.metadata?.orderId;
    if (!orderId) {
      console.error('🚫 No order ID in metadata');
      return res.status(400).send('Missing order ID');
    }

    try {
      const order = await Order.findById(orderId);
      if (!order) {
        console.error('❌ Order not found in database');
        return res.status(404).send('Order not found');
      }

      // Обновляем статус и сохраняем информацию о платеже
      order.status = 'paid';
      order.paymentIntentId = session.payment_intent;
      await order.save();

      console.log(`Order ${order._id} marked as PAID`);

      await sendOrderDetailsMail(order);

      return res.status(200).json({ received: true });
    } catch (err) {
      console.error('Error updating order status:', err);
      return res.status(500).send('Internal server error');
    }
  }

  console.log('ℹ️ Event not handled:', event.type);
  // Если событие не обработано — просто подтверждаем приём
  res.status(200).json({ received: true });
}
