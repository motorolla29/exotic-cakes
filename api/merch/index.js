import { connectToDatabase } from '../db.js';
import Merch from '../../models/Merch.js';

export default async function handler(req, res) {
  try {
    // Параметры запроса: page и limit
    const { page = 1, limit = 48 } = req.query;
    const pageNum = Math.max(parseInt(page, 10), 1);
    const limitNum = Math.max(parseInt(limit, 10), 1);

    await connectToDatabase();

    // Общее количество мерча
    const totalCount = await Merch.countDocuments({});

    // Запрос мерча с пагинацией
    const items = await Merch.find({})
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .lean()
      .exec();

    // Возвращаем данные
    res.status(200).json({
      items,
      totalCount,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalCount / limitNum),
    });
  } catch (error) {
    console.error('Error fetching merch items:', error);
    res.status(500).json({ error: 'Failed to fetch merch items' });
  }
}
