const generateOrderEmailContent = (order) => {
  const orderDate = order.shipping?.date ? new Date(order.shipping.date) : null;

  return `<!DOCTYPE html>
  <html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@600&display=swap" rel="stylesheet" />
    <link href="https://fonts.cdnfonts.com/css/klyakson" rel="stylesheet" />
    <style>
      /* Fallback styles for email clients */
      body { margin:0; padding:0; }
      img { display:block; max-width:100%; height:auto; }
      table { border-collapse:collapse; table-layout:fixed; }
      hr { border: none; border-top: 1px solid #cccccc50; margin: 12px 0; }
    </style>
  </head>
  <body style="font-family: Fredoka, 'Comic Sans MS', Arial, sans-serif; margin: 0; padding: 0; background-color: #d8cef7a0; color: #481e5c;">
    <!-- Outer wrapper for margin on mobile -->
    <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding: 20px 10px;">
          <!-- Main container -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #fffbe8; border-radius: 32px; overflow: hidden;">
            <tr>
              <td style="padding: 20px; box-sizing: border-box;">
  
                <!-- Logo -->
                <div style="text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
                  <img alt="logo" src="https://ik.imagekit.io/motorolla29/exotic-cakes/logo/EC-logo-fullsize.png?tr=w-300" width="220" style="margin: 0 auto;" />
                </div>
  
                <!-- Header -->
                <h2 style="text-align: center; margin: 16px 0 8px;">Thank you for your order!</h2>
                <p style="font-size: 14px; color: #555; text-align: center; margin: 16px 0 8px;">Dear ${
                  order.customerInfo.name || 'Customer'
                },</p>
                <p style="font-size: 14px; color: #555; text-align: center; margin: 8px 0 16px;">We have received your order and it is being processed. Below are the details:</p>
                <h3 style="text-align: center; margin: 24px 0 8px;">Order №: ${
                  order.orderNumber
                }</h3>
  
                <!-- Items -->
                <h4 style="border-bottom: 1px solid #ccc; padding-bottom: 8px; margin: 16px 0 12px;">Items:</h4>
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
                    const imageUrl =
                      type === 'merch'
                        ? `https://ik.imagekit.io/motorolla29/exotic-cakes/merch/${image.src}?tr=w-150`
                        : `https://ik.imagekit.io/motorolla29/exotic-cakes/catalog/${image.src}?tr=w-150`;
                    console.log(imageUrl);
                    return `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;">
                      <tr>
                        <td style="width:70px; height:70px; vertical-align: top;">
                          <img src="${imageUrl}" alt="product_img" width="70" height="70" style="width:70px; height:70px; border-radius:5px; display:block; object-fit: cover;" />
                        </td>
                        <td style="padding-left:12px; vertical-align: top;">
                          <p style="margin:0 0 6px; font-weight:500; color:#481e5c;">${quantity} x ${title}</p>
                          ${
                            option
                              ? `<p style="margin:0 0 4px; font-size:14px;">${optionName}: <span style="opacity:0.8;">${option}</span></p>`
                              : ''
                          }
                          ${
                            spongeVariant
                              ? `<p style="margin:0 0 4px; font-size:14px;">Sponge: <span style="opacity:0.8;">${spongeVariant}</span></p>`
                              : ''
                          }
                          ${
                            fillVariant
                              ? `<p style="margin:0 0 4px; font-size:14px;">Filling Icing: <span style="opacity:0.8;">${fillVariant}</span></p>`
                              : ''
                          }
                          ${
                            merchVariants
                              ? Object.entries(merchVariants)
                                  .map(
                                    ([k, v]) =>
                                      `<p style="margin:0 0 4px; font-size:14px;">${k}: <span style="opacity:0.8;">${v}</span></p>`
                                  )
                                  .join('')
                              : ''
                          }
                          ${
                            cakeSign
                              ? `<p style="margin:12px 0 0; color:#481e5c; line-height:1;">
                                  <img src="https://ik.imagekit.io/motorolla29/exotic-cakes/icons/cake-icon.png" width="14" height="14" alt="Cake" style="display: inline-block; vertical-align:middle; margin-right:6px;" />Write on cake:</p>
                              <p style="margin:4px 0 0; font-family:Klyakson,Arial,sans-serif; font-size:13px; opacity:0.8;">${cakeSign}</p>`
                              : ''
                          }
                          ${
                            cartMessage
                              ? `<p style="margin:8px 0 0; color:#481e5c; line-height:1;">
                                  <img src="https://ik.imagekit.io/motorolla29/exotic-cakes/icons/pencil-heart-icon.png" width="14" height="14" alt="Cake" style="display: inline-block; vertical-align:middle; margin-right:6px;" />Card with handwritten text:</p>
                              <p style="margin:4px 0 0; font-family:Klyakson,Arial,sans-serif; font-size:13px; opacity:0.8;">${cartMessage}</p>`
                              : ''
                          }
                        </td>
                        <td style="width:60px; text-align:right; vertical-align: top; color:#481e5c; font-weight:bold; padding-left:10px;">$${price}</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="padding:0;">
                          <hr />
                        </td>
                      </tr>
                    </table>
                  `;
                  })
                  .join('')}
  
                <!-- Shipping -->
                <h4 style="margin:12px 0 8px;">Shipping ($${
                  order.shipping?.cost
                }):</h4>
                ${
                  order.shipping?.method
                    ? `<p style="font-size:13px; color:#555; margin:0 0 4px;">${order.shipping.method}</p>`
                    : ''
                }
                ${
                  orderDate
                    ? `<p style="font-size:13px; color:#555; margin:0 0 12px;">${orderDate.toLocaleDateString(
                        'en-GB',
                        { month: 'short', day: 'numeric', weekday: 'long' }
                      )}, 9AM - 5PM</p>`
                    : ''
                }
                ${
                  order.deliveryInfo
                    ? `
                  <p style="font-size:13px; color:#555; margin:0 0 4px;">${
                    order.deliveryInfo.line1
                  }${
                        order.deliveryInfo.line2
                          ? `, ${order.deliveryInfo.line2}`
                          : ''
                      }</p>
                  <p style="font-size:13px; color:#555; margin:0 0 4px;">${[
                    order.deliveryInfo.postalCode,
                    order.deliveryInfo.city,
                    order.deliveryInfo.country,
                  ]
                    .filter(Boolean)
                    .join(', ')}</p>
                  ${
                    order.customerInfo.phone
                      ? `<p style="font-size:13px; color:#555; margin:0 0 12px;">${order.customerInfo.phone}</p>`
                      : ''
                  }
                `
                    : ''
                }
  
                <!-- Total -->
                <h4 style="margin:32px 0 64px; padding:16px 0; border-top:1px solid #ccc; border-bottom:1px solid #ccc; font-size:18px; font-weight:600;">Total: $${
                  order.total
                }</h4>
  
                <!-- Footer -->
                <p style="margin:0 0 8px; text-align:center;">If you have any questions, feel free to contact us at<br/><a href="mailto:eutyou@gmail.com" style="color:#481e5c; text-decoration:none;">support@exotic-cakes.com</a></p>
                <p style="margin:0; padding:12px 0 0 0; text-align:center; font-size:14px; color:#555; border-top: 1px solid #ccc;">Thank you for choosing Exotic Cakes!</p>
  
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};

export default generateOrderEmailContent;
