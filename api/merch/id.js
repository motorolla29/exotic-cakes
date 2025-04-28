import { connectToDatabase } from '../db.js';
import Merch from '../../models/Merch.js';

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: 'Missing merch id' });
  }

  try {
    await connectToDatabase();
    const merch = await Merch.findOne({ id }).lean();
    if (!merch) {
      return res.status(404).json({ error: 'Merch item not found' });
    }
    res.status(200).json({ merch });
  } catch (error) {
    console.error('Error fetching merch by id:', error);
    res.status(500).json({ error: 'Failed to fetch merch item' });
  }
}
