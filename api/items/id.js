import { connectToDatabase } from '../db.js';
import Item from '../../models/Item.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing item id' });
  }

  try {
    await connectToDatabase();
    const item = await Item.findOne({ id }).lean();
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json({ item });
  } catch (error) {
    console.error('Error fetching item by id:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
}
