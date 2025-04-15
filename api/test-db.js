import { connectToDatabase } from './db.js';
import mongoose from 'mongoose';

// Создание схемы и модели
const TestItemSchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Проверка на повторное объявление модели (для dev-режима)
const TestItem =
  mongoose.models.TestItem || mongoose.model('TestItem', TestItemSchema);

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { name } = req.body;
    try {
      const item = await TestItem.create({ name });
      return res.status(201).json({ success: true, item });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  if (req.method === 'GET') {
    try {
      const items = await TestItem.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, items });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  return res
    .status(405)
    .json({ success: false, message: 'Method not allowed' });
}
