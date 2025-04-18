import nodemailer from 'nodemailer';
import ReactDOMServer from 'react-dom/server';

import OrderDetailsMail from './order-details-mail';
import mailCss from './order-details-mail.css';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendOrderConfirmationEmail = async (order) => {
  const mailOptions = {
    from: `"Exotic Cakes" ${process.env.SMTP_MAIL_FROM}`,
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

// Функция для генерации содержания письма
const generateOrderEmailContent = (order) => {
  const reactHtml = ReactDOMServer.renderToStaticMarkup(
    <OrderDetailsMail order={order} />
  );
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
  <link href="https://fonts.cdnfonts.com/css/klyakson" rel="stylesheet" />
  <style>
    ${mailCss}
  </style>
</head>
<body>
  ${reactHtml}
</body>
</html>`;
};
