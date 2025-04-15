const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res
      .status(405)
      .json({ error: 'Метод не разрешён. Используйте POST-запрос.' });
    return;
  }

  try {
    const { sessionId, orderId } = req.body;
    if (!sessionId || !orderId) {
      return res
        .status(400)
        .json({ error: 'Отсутствуют sessionId или orderId.' });
    }

    // Проверка платежной сессии через Stripe (в тестовом режиме)
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Платеж не завершён успешно.' });
    }

    // Обновляем статус заказа в mockAPI (опционально)
    const ordersUrl = process.env.MOCKAPI_ORDERS_URL;
    if (ordersUrl) {
      // Обновляем заказ через PATCH-запрос (предполагается, что mockAPI поддерживает PATCH)
      await fetch(`${ordersUrl}/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'paid' }),
      });
    }

    // Формируем HTML-содержимое письма
    const emailContent = `
      <h2>Ваш заказ успешно оплачен</h2>
      <p>Номер заказа: <strong>${orderId}</strong></p>
      <p>Дата оплаты: ${new Date().toLocaleString()}</p>
    `;

    // Настраиваем nodemailer (переменные окружения SMTP_* задаются в Vercel Dashboard)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your Shop" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL, // адрес, куда отправляется уведомление о заказе
      subject: `Заказ № ${orderId} оплачен успешно`,
      html: emailContent,
    });

    res
      .status(200)
      .json({ orderId, message: 'Заказ успешно оплачен и подтверждён.' });
  } catch (error) {
    console.error('Ошибка при обработке оплаты заказа:', error);
    res.status(500).json({ error: error.message });
  }
};
