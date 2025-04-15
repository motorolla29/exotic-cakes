const nodemailer = require('nodemailer');

// Для поддержки CORS, если запрос приходит с другого домена (опционально)
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

module.exports = async (req, res) => {
  // Обработка preflight-запроса для CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    return;
  }

  // Функция принимает только POST запросы
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json', ...headers });
    res.end(
      JSON.stringify({ error: 'Метод не разрешён. Используйте POST запрос.' })
    );
    return;
  }

  try {
    // Убедимся, что тело запроса содержит данные заказа (например, JSON)
    let orderData = req.body;

    // Если приходит строка (например, если нет настроенного middleware), пробуем распарсить
    if (typeof orderData === 'string') {
      orderData = JSON.parse(orderData);
    }

    // Простейшая валидация (можно расширить по вашим требованиям)
    if (
      !orderData ||
      !orderData.email ||
      !orderData.items ||
      !orderData.customerName
    ) {
      res.writeHead(400, { 'Content-Type': 'application/json', ...headers });
      res.end(JSON.stringify({ error: 'Неверные данные заказа.' }));
      return;
    }

    // Конфигурация транспорта для nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true для порта 465, иначе false
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Генерируем HTML-содержимое письма на основе данных заказа
    const generateOrderHTML = (order) => {
      // Пример: формируем список товаров
      let itemsHTML = '';
      order.items.forEach((item) => {
        itemsHTML += `<li>${item.name} — ${item.quantity} шт. за ${item.price} руб. за ед.</li>`;
      });
      return `
        <h2>Новый заказ</h2>
        <p><strong>Имя клиента:</strong> ${order.customerName}</p>
        <p><strong>Email клиента:</strong> ${order.email}</p>
        <h3>Список товаров:</h3>
        <ul>
          ${itemsHTML}
        </ul>
        <p><strong>Общая сумма:</strong> ${order.total} руб.</p>
      `;
    };

    const mailOptions = {
      from: `"Магазин" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL, // получатель письма
      subject: `Новый заказ от ${orderData.customerName}`,
      html: generateOrderHTML(orderData),
    };

    // Отправляем email
    const info = await transporter.sendMail(mailOptions);
    console.log('Сообщение отправлено: ', info.messageId);

    // Формируем ответ клиенту
    res.writeHead(200, { 'Content-Type': 'application/json', ...headers });
    res.end(
      JSON.stringify({ message: 'Заказ успешно принят, письмо отправлено.' })
    );
  } catch (error) {
    console.error('Ошибка при обработке заказа:', error);
    res.writeHead(500, { 'Content-Type': 'application/json', ...headers });
    res.end(
      JSON.stringify({ error: error.message || 'Внутренняя ошибка сервера' })
    );
  }
};
