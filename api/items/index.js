import { connectToDatabase } from '../db.js';
import Item from '../../models/Item.js';

export default async function handler(req, res) {
  try {
    // Параметры запроса: category, page, limit
    const { category = 'all', page = 1, limit = 24 } = req.query;
    const pageNum = Math.max(parseInt(page, 10), 1);
    const limitNum = Math.max(parseInt(limit, 10), 1);

    await connectToDatabase();

    // Формируем фильтр
    const filter = category && category !== 'all' ? { category } : {};

    // Общее количество товаров по фильтру
    const totalCount = await Item.countDocuments(filter);

    // Запрос товаров с пагинацией
    const items = await Item.find(filter)
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
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
