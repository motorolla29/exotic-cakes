import { connectToDatabase } from './db.js';
import Order from '../models/Order.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET, {
  apiVersion: '2022-11-15',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  console.log('Incoming request body:', req.body);

  try {
    await connectToDatabase();

    const {
      items,
      subtotal,
      total,
      shipping,
      currency = 'usd',
      customerInfo,
      deliveryInfo,
      notes,
    } = req.body;

    // Простая валидация
    if (
      !items?.length ||
      !customerInfo?.name ||
      !customerInfo?.email ||
      !deliveryInfo?.line1
    ) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }
    console.log('Building order object...');
    // 1. Создаём заказ в БД (до создания сессии Stripe, так как нужна информация для платежа)
    const order = new Order({
      items,
      subtotal,
      total,
      shipping, // { method, date, cost }
      currency,
      customerInfo, // { name, email, phone }
      deliveryInfo, // { country, city, postalCode, line1, line2, coords }
      notes,
      status: 'pending',
    });

    // 2) Готовим список line_items для Stripe
    const lineItems = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.title,
          metadata: {
            itemId: item.id,
            type: item.type,
            ...(item.optionName && { optionName: item.optionName }),
            ...(item.option && { option: item.option }),
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Добавляем доставку как отдельную позицию
    if (shipping.cost) {
      lineItems.push({
        price_data: {
          currency,
          product_data: { name: `Shipping — ${shipping.method}` },
          unit_amount: Math.round(shipping.cost * 100),
        },
        quantity: 1,
      });
    }
    console.log('Creating Stripe session...');
    // 2. Создаём Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      customer_email: customerInfo.email,
      metadata: {
        orderId: order._id.toString(),
      },
      success_url: `${process.env.PUBLIC_BASE_URL}/checkout-success?orderId=${order._id}`,
      cancel_url: `${process.env.PUBLIC_BASE_URL}/checkout-failure`,
    });
    console.log('Stripe session created:', session.id);
    // 4) Сохраняем идентификаторы Stripe в заказ
    order.stripeSessionId = session.id;
    // session.payment_intent может приходить пустым, обновлять позже через webhook
    order.paymentIntentId = session.payment_intent || '';
    console.log('Saving order to DB...');
    await order.save();

    // 5) Отдаём клиенту sessionId
    res.status(200).json({ sessionId: session.id, redirectUrl: session.url });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
