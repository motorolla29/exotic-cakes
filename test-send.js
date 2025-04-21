import dotenv from 'dotenv';
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  logger: true,
  debug: true,
  connectionTimeout: 5000, // Тайм-аут на подключение
  greetingTimeout: 3000, // Тайм-аут на ответ от сервера
  socketTimeout: 30000,
});

transporter.sendMail(
  {
    from: `Exotic Cakes ${process.env.SMTP_MAIL_FROM}`,
    to: 'eutyou@gmail.com',
    subject: 'Your Order with Exotic Cakes',
    text: 'Проверка отправки почты через Nodemailer и Brevo',
  },
  (err, info) => {
    if (err) {
      console.error('❌ Ошибка отправки:', err);
    } else {
      console.log('✅ Успешно отправлено:', info.response);
    }
  }
);
