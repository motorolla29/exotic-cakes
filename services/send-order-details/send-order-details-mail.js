import nodemailer from 'nodemailer';
import generateOrderEmailContent from './generate-order-email-content.js';

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

export const sendOrderDetailsMail = async (order) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL_FROM,
    to: order.customerInfo?.email,
    subject: 'Your Order with Exotic Cakes',
    html: generateOrderEmailContent(order),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent: ', info.response);
  } catch (err) {
    console.error('Error sending order confirmation email: ', err);
  }
};
