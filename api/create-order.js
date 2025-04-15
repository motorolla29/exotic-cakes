import { connectToDatabase } from './db.js';
import Order from '../models/Order';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { items, subtotal, currency = 'usd', customerInfo, notes } = req.body;

    // 1. Создаём заказ в БД (до создания сессии Stripe, так как нужна информация для платежа)
    const order = new Order({
      items,
      subtotal,
      currency,
      customerInfo,
      notes,
      status: 'pending',
    });

    // 2. Создаём Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: 'Order from shop',
            },
            unit_amount: Math.round(subtotal * 100),
          },
          quantity: 1,
        },
      ],
      customer_email: customerInfo?.email,
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-success?orderId=${order._id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout-failure`,
    });

    if (!session.id) {
      throw new Error('Stripe session creation failed');
    }

    // 3. Сохраняем идентификаторы сессии в заказ
    order.paymentIntentId = session.payment_intent || '';
    order.stripeSessionId = session.id;
    await order.save();

    // 4. Отправляем sessionId клиенту
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
