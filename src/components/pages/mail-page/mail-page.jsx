import { TbPencilHeart } from 'react-icons/tb';
import { LuCake } from 'react-icons/lu';

import './mail-page.sass';

const MailPage = (o) => {
  const order = {
    _id: 'sdgijjgpo',
    items: [
      {
        stringParams: '',
        id: 'ea3a67dc-abe4-4c12-a3ee-aaadb84f7643',
        category: 'all',
        title: 'Mouse Cheese Fest Cake',
        image: {
          src: 'OIG3.cE9xxfayoeDOq1NXm.jpg',
          hash: 'UUKwd.~pk?bcTJE1IVWB0%kWaJoy4.xrxtfl',
        },
        price: 39,
        optionName: 'Size',
        option: '6-inch',
        spongeVariant: 'Funfetti',
        fillVariant: 'Cream Cheese Icing',
        cartMessage: null,
        cakeSign: null,
        quantity: 2,
      },
      {
        type: 'merch',
        stringParams: '',
        id: 'branded-lilac-umbrella',
        title: 'Branded Lilac Umbrella',
        image: {
          src: 'umbrella.png',
          hash: 'UaOf.rM__Jt8ozjuaxfP_Ls;xrWVWAa{j]ju',
        },
        price: 20,
        optionName: null,
        option: null,
        merchVariants: null,
        quantity: 1,
      },
      {
        stringParams: 'option=8-inch',
        id: 'ea3a67dc-abe4-4c12-a3ee-aaadb84f7643',
        category: 'all',
        title: 'Mouse Cheese Fest Cake',
        image: {
          src: 'OIG3(4).jpg',
          hash: 'UaLy[q01yDM{~VnhR.jsOtRjRjfkN1RkWWR*',
        },
        price: 69,
        optionName: 'Size',
        option: '8-inch',
        spongeVariant: 'Funfetti',
        fillVariant: 'Cream Cheese Icing',
        cartMessage: 'wegweg',
        cakeSign: 'sdg gfddsss sssss sssss sssss dfffffffffffsew',
        quantity: 1,
      },
      {
        type: 'merch',
        stringParams: 'variants=%7B%22Size%22%3A%22L%22%7D',
        id: "branded-black-women's-sweatpants",
        title: "Branded Black Women's Sweatpants",
        image: {
          src: "women's-sweatpants-front.png",
          hash: 'UtQvqCWB~qt7IUayx]j[s:juR*ayj[j[ayay',
        },
        price: 20,
        optionName: null,
        option: null,
        merchVariants: {
          Size: 'L',
        },
        quantity: 1,
      },
    ],
    subtotal: 187,
    total: 193.03,
    shipping: {
      method: 'London Hand Delivery',
      date: '2025-04-21T10:16:53.854Z',
      cost: 7.08,
    },
    currency: 'usd',
    notes: 'jjjjjjjjjj',
    customerInfo: {
      name: 'dsf',
      email: 'dsf@fdd.r',
      phone: '+44 3455555555',
    },
    deliveryInfo: {
      country: 'United Kingdom',
      city: 'London',
      postalCode: 'SE10 9LG',
      line1: '6 Old Pearson Street, Greenwich, SE10 9LG, United Kingdom',
      line2: '65',
      coords: {
        lat: 51.4791461,
        lng: -0.0154588,
      },
    },
  };
  const orderDate = new Date(order.shipping?.date);
  return (
    <div className="order-mail">
      <div className="order-mail_header">
        <img
          alt="logo"
          src="https://ik.imagekit.io/motorolla29/exotic-cakes/logo/EC-logo-fullsize.png?tr=w-300"
        />
      </div>
      <h2>Thank you for your order!</h2>
      <p>Dear {order.customerInfo.name || 'Customer'},</p>
      <p>
        We have received your order and it is being processed. Below are the
        details:
      </p>
      <h3>Order ID: {order._id}</h3>
      <h4>Items:</h4>
      <div className="order-mail_items">
        {order.items.map((item, idx) => {
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
          return (
            <div key={idx} className="order-mail_items_item">
              <div className="order-mail_items_item_image">
                <img
                  src={`${
                    type === 'merch'
                      ? 'https://ik.imagekit.io/motorolla29/exotic-cakes/merch'
                      : 'https://ik.imagekit.io/motorolla29/exotic-cakes/catalog'
                  }/${image.src}?tr=w-150`}
                />
              </div>
              <div className="order-mail_items_item_details">
                <div className="order-mail_items_item_details_main">
                  <p className="order-mail_items_item_title">
                    {quantity} x {title}
                  </p>
                  <div>
                    {option ? (
                      <p className="order-mail_items_item_details_main_info_options">
                        {`${optionName}: `}
                        <span>{option}</span>
                      </p>
                    ) : null}
                    {spongeVariant ? (
                      <p className="order-mail_items_item_details_main_info_sponge">
                        Sponge: <span>{spongeVariant}</span>
                      </p>
                    ) : null}
                    {fillVariant ? (
                      <p className="order-mail_items_item_details_main_info_filling">
                        Filling Icing: <span>{fillVariant}</span>
                      </p>
                    ) : null}
                    {merchVariants
                      ? Object.entries(merchVariants).map((it) => {
                          return (
                            <p
                              key={it}
                              className="order-mail_items_item_details_main_info_filling"
                            >
                              {it[0]}: <span>{it[1]}</span>
                            </p>
                          );
                        })
                      : null}
                    {cakeSign ? (
                      <div className="order-mail_items_item_details_main_info_cake-sign">
                        <span>
                          <LuCake />
                          Write on cake:
                        </span>
                        <p>{cakeSign}</p>
                      </div>
                    ) : null}
                    {cartMessage ? (
                      <div className="order-mail_items_item_details_main_info_card-message">
                        <span>
                          <TbPencilHeart />
                          Card with handwritten text:
                        </span>
                        <p>{cartMessage}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
                <span className="order-mail_items_item_details_price">
                  ${price}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="order-mail_shipping">
        <h4>Shipping (${order.shipping?.cost}) :</h4>
        {order.shipping?.method ? <p>{order.shipping.method}</p> : ''}
        {orderDate ? (
          <p>{`${orderDate.toLocaleDateString('en-GB', {
            month: 'short',
          })} ${orderDate.toLocaleDateString('en-GB', {
            day: 'numeric',
          })}, ${orderDate.toLocaleDateString('en-GB', {
            weekday: 'long',
          })}, 9AM - 5PM`}</p>
        ) : (
          ''
        )}
        {order.deliveryInfo && (
          <div className="order-mail_shipping_address">
            {order.deliveryInfo?.line1 && (
              <p>
                {order.deliveryInfo.line1}
                {order.deliveryInfo.line2 && `, ${order.deliveryInfo.line2}`}
              </p>
            )}
            {(order.deliveryInfo.postalCode ||
              order.deliveryInfo.city ||
              order.deliveryInfo.country) && (
              <p>
                {[
                  order.deliveryInfo.postalCode,
                  order.deliveryInfo.city,
                  order.deliveryInfo.country,
                ]
                  .filter(Boolean)
                  .join(', ')}
              </p>
            )}
            {order.customerInfo.phone && <p>{order.customerInfo.phone}</p>}
          </div>
        )}
      </div>

      <div className="order-mail_total">
        <h4>Total: ${order.total}</h4>
      </div>

      <p className="order-mail_contact">
        If you have any questions, feel free to contact us at
        <br />
        <a href="mailto:eutyou@gmail.com">support@exotic-cakes.com</a>.
      </p>
      <div class="order-mail_footer">
        <p>Thank you for choosing Exotic Cakes!</p>
      </div>
    </div>
  );
};
export default MailPage;
