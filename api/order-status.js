import { connectToDatabase } from './db.js';
import Order from '../models/Order.js';

export default async function handler(req, res) {
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId' });
  }

  try {
    await connectToDatabase();

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
}
