const generateOrderEmailContent = (order) => {
  const orderDate = order.shipping?.date ? new Date(order.shipping.date) : null;

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
    <link href="https://fonts.cdnfonts.com/css/klyakson" rel="stylesheet" />
    <style>
      body {
          font-family: Fredoka, Comic Sans MS, Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #d8cef7a0;
          color: #481e5c;
        }
        .order-mail {
          background-color: #fffbe8;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border-radius: 32px;
        }
        .order-mail_header {
          display: flex;
          align-items: center;
          justify-content: center;
          height: fit-content;
          border-bottom: 1px solid #ccc;
        }
        .order-mail_header img {
          width: 220px;
          height: auto;
          margin-bottom: 20px;
        }
        .order-mail > h2,
        .order-mail > h3,
        .order-mail > p {
          text-align: center;
        }
        .order-mail > h2 {
          margin: 16px 0 8px 0;
        }
        .order-mail > p {
          margin: 8px 0 0 8px;
          color: #555;
        }
        .order-mail > h3 {
          margin: 16px 0 8px 0;
        }
        .order-mail > h4 {
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 8px;
        }
        .order-mail_items_item {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid #cccccc50;
        }
        .order-mail_items_item_image {
          border-radius: 5px;
          overflow: hidden;
          aspect-ratio: 1/1;
          width: 70px;
          min-width: 70px;
          height: fit-content;
        }
        .order-mail_items_item_image img {
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .order-mail_items_item_title {
          color: #481e5c;
          margin-bottom: 7px;
          margin-right: 10px;
        }
        .order-mail_items_item_details {
          font-size: 14px;
          display: flex;
          flex: 1;
          justify-content: space-between;
          color: #555;
        }
        .order-mail_items_item_details_main {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 12px;
        }
        .order-mail_items_item_details_main_info_options,
        .order-mail_items_item_details_main_info_sponge,
        .order-mail_items_item_details_main_info_filling {
          padding-bottom: 5px;
        }
        .order-mail_items_item_details_main_info_options span,
        .order-mail_items_item_details_main_info_sponge span,
        .order-mail_items_item_details_main_info_filling span {
          opacity: 0.8;
        }
        .order-mail_items_item_details_main_info_card-message,
        .order-mail_items_item_details_main_info_cake-sign {
          padding-top: 10px;
        }
        .order-mail_items_item_details_main_info_card-message span,
        .order-mail_items_item_details_main_info_cake-sign span {
          display: flex;
          align-items: center;
        }
        .order-mail_items_item_details_main_info_card-message span svg,
        .order-mail_items_item_details_main_info_cake-sign span svg {
          margin-right: 5px;
        }
        .order-mail_items_item_details_main_info_card-message p,
        .order-mail_items_item_details_main_info_cake-sign p {
          overflow-wrap: anywhere;
          word-break: normal;
          min-width: 0;
          margin-top: 4px;
          font-family: Klyakson, Arial, sans-serif;
          opacity: 0.8;
        }
        .order-mail_items_item_details_price {
          color: #481e5c;
        }
        .order-mail_shipping > h4 {
          margin: 12px 0 8px 0;
        }
        .order-mail_shipping > p {
          font-size: 14px;
          color: #555;
        }
        .order-mail_shipping_address {
          font-size: 14px;
          color: #555;
          margin: 8px 0;
        }
        .order-mail_total > h4 {
          margin: 32px 0 64px 0;
          padding: 16px 0;
          border-top: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          font-size: larger;
          font-weight: 600;
        }
        .order-mail_footer {
          padding-top: 8px;
          margin-top: 8px;
          border-top: 1px solid #ccc;
        }
        .order-mail_footer > p {
          text-align: center;
        }
    </style>
  </head>
  <body>
    <div class="order-mail">
      <div class="order-mail_header">
        <img
          alt="logo"
          src="https://ik.imagekit.io/motorolla29/exotic-cakes/logo/EC-logo-fullsize.png?tr=w-300"
        />
      </div>
      <h2>Thank you for your order!</h2>
      <p>Dear ${order.customerInfo.name || 'Customer'},</p>
      <p>
        We have received your order and it is being processed. Below are the details:
      </p>
      <h3>Order ID: ${order._id}</h3>
      <h4>Items:</h4>
      <div class="order-mail_items">
        ${order.items
          .map((item) => {
            const {
              type,
              title,
              price,
              quantity,
              image,
              optionName,
              option,
              spongeVariant,
              fillVariant,
              cakeSign,
              cartMessage,
              merchVariants,
            } = item;

            return `
            <div class="order-mail_items_item">
              <div class="order-mail_items_item_image">
                <img src="${
                  type === 'merch'
                    ? `https://ik.imagekit.io/motorolla29/exotic-cakes/merch/${image.src}?tr=w-150`
                    : `https://ik.imagekit.io/motorolla29/exotic-cakes/catalog/${image.src}?tr=w-150`
                }" />
              </div>
              <div class="order-mail_items_item_details">
                <div class="order-mail_items_item_details_main">
                  <p class="order-mail_items_item_title">${quantity} x ${title}</p>
                  <div>
                    ${
                      option
                        ? `<p class="order-mail_items_item_details_main_info_options">${optionName}: <span>${option}</span></p>`
                        : ''
                    }
                    ${
                      spongeVariant
                        ? `<p class="order-mail_items_item_details_main_info_sponge">Sponge: <span>${spongeVariant}</span></p>`
                        : ''
                    }
                    ${
                      fillVariant
                        ? `<p class="order-mail_items_item_details_main_info_filling">Filling Icing: <span>${fillVariant}</span></p>`
                        : ''
                    }
                    ${
                      merchVariants
                        ? Object.entries(merchVariants)
                            .map(
                              ([k, v]) =>
                                `<p class="order-mail_items_item_details_main_info_filling">${k}: <span>${v}</span></p>`
                            )
                            .join('')
                        : ''
                    }
                    ${
                      cakeSign
                        ? `<div class="order-mail_items_item_details_main_info_cake-sign"><span>Write on cake:</span><p>${cakeSign}</p></div>`
                        : ''
                    }
                    ${
                      cartMessage
                        ? `<div class="order-mail_items_item_details_main_info_card-message"><span>Card with handwritten text:</span><p>${cartMessage}</p></div>`
                        : ''
                    }
                  </div>
                </div>
                <span class="order-mail_items_item_details_price">$${price}</span>
              </div>
            </div>
          `;
          })
          .join('')}
      </div>
  
      <div class="order-mail_shipping">
        <h4>Shipping ($${order.shipping?.cost}) :</h4>
        ${order.shipping?.method ? `<p>${order.shipping.method}</p>` : ''}
        ${
          orderDate
            ? `<p>${orderDate.toLocaleDateString('en-GB', {
                month: 'short',
              })} ${orderDate.toLocaleDateString('en-GB', {
                day: 'numeric',
              })}, ${orderDate.toLocaleDateString('en-GB', {
                weekday: 'long',
              })}, 9AM - 5PM</p>`
            : ''
        }
        ${
          order.deliveryInfo
            ? `
          <div class="order-mail_shipping_address">
            ${
              order.deliveryInfo.line1
                ? `<p>${order.deliveryInfo.line1}${
                    order.deliveryInfo.line2
                      ? `, ${order.deliveryInfo.line2}`
                      : ''
                  }</p>`
                : ''
            }
            ${
              order.deliveryInfo.postalCode ||
              order.deliveryInfo.city ||
              order.deliveryInfo.country
                ? `
              <p>${[
                order.deliveryInfo.postalCode,
                order.deliveryInfo.city,
                order.deliveryInfo.country,
              ]
                .filter(Boolean)
                .join(', ')}</p>`
                : ''
            }
            ${
              order.customerInfo.phone
                ? `<p>${order.customerInfo.phone}</p>`
                : ''
            }
          </div>
        `
            : ''
        }
      </div>
  
      <div class="order-mail_total">
        <h4>Total: $${order.total}</h4>
      </div>
  
      <p class="order-mail_contact">
        If you have any questions, feel free to contact us at
        <br />
        <a href="mailto:support@exotic-cakes.com">support@exotic-cakes.com</a>.
      </p>
      <div class="order-mail_footer">
        <p>Thank you for choosing Exotic Cakes!</p>
      </div>
    </div>
  </body>
  </html>`;
};

export default generateOrderEmailContent;
