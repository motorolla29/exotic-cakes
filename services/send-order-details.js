import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Или другой сервис, который вы используете (например, SendGrid)
  auth: {
    user: process.env.EMAIL_USER, // ваш email
    pass: process.env.EMAIL_PASS, // ваш пароль или API токен
  },
});

export const sendOrderConfirmationEmail = async (order) => {
  // Создаём письмо
  const mailOptions = {
    from: process.env.EMAIL_USER, // От кого
    to: order.customerInfo.email, // Кому
    subject: `Your Order with Exotic Cakes (#${order._id})`, // Тема письма
    html: generateOrderEmailContent(order), // Содержание письма в формате HTML
  };

  // Отправляем письмо
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent: ', info.response);
  } catch (err) {
    console.error('Error sending order confirmation email: ', err);
  }
};

// Функция для генерации содержания письма
const generateOrderEmailContent = (order) => {
  return `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f8f8;
        }
        h1, h3, h4 {
          color: #4CAF50;
        }
        p {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
          margin: 5px 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
        }
        .items-list {
          padding-left: 20px;
        }
        .items-list li {
          margin-bottom: 15px;
        }
        .footer {
          font-size: 12px;
          color: #777;
          text-align: center;
          margin-top: 20px;
        }
        .highlight {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Thank you for your order!</h1>
        <p>Dear ${order.customerInfo.name},</p>
        <p>We have received your order and it is being processed. Below are the details:</p>

        <h3>Order ID: #${order._id}</h3>

        <h4>Items:</h4>
        <ul class="items-list">
          ${order.items
            .map(
              (item) => `
            <li>
              <strong>${item.title}</strong><br>
              ${
                item.option
                  ? `<span><strong>Size:</strong> ${item.option}</span><br>`
                  : ''
              }
              ${
                item.spongeVariant
                  ? `<span><strong>Sponge:</strong> ${item.spongeVariant}</span><br>`
                  : ''
              }
              ${
                item.fillVariant
                  ? `<span><strong>Filling:</strong> ${item.fillVariant}</span><br>`
                  : ''
              }
              <span><strong>Quantity:</strong> ${item.quantity}</span><br>
              <span><strong>Price:</strong> $${item.price.toFixed(2)}</span>
            </li>`
            )
            .join('')}
        </ul>

        <h4>Shipping:</h4>
        <p><strong>Method:</strong> ${order.shipping.method}</p>
        <p><strong>Delivery Date:</strong> ${new Date(
          order.shipping.date
        ).toLocaleString()}</p>
        <p><strong>Shipping Cost:</strong> $${order.shipping.cost.toFixed(
          2
        )}</p>

        <h4>Total: $${(order.subtotal + order.shipping.cost).toFixed(2)}</h4>

        <h3>Delivery Information:</h3>
        <p><strong>Address:</strong> ${order.deliveryInfo.line1}</p>
        ${
          order.deliveryInfo.apartment
            ? `<p><strong>Apartment:</strong> ${order.deliveryInfo.apartment}</p>`
            : ''
        }
        <p><strong>Postal Code:</strong> ${order.deliveryInfo.postalCode}</p>
        <p><strong>City:</strong> ${order.deliveryInfo.city}</p>
        <p><strong>Country:</strong> ${order.deliveryInfo.country}</p>
        ${
          order.deliveryInfo.phone
            ? `<p><strong>Phone:</strong> ${order.deliveryInfo.phone}</p>`
            : ''
        }

        <p>We will notify you once your order has been shipped.</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@exoticcakes.com">support@exoticcakes.com</a>.</p>

        <div class="footer">
          <p>Thank you for choosing Exotic Cakes!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
