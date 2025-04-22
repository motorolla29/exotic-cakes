import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ECLogoCake from '../../../icons/cake-svg.svg';

import './checkout-success.sass';
import { ImpulseSpinner } from 'react-spinners-kit';
import { TiWarning } from 'react-icons/ti';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import BlurhashImage from '../../blurhash-image/blurhash-image';
import { baseImagesURL, baseMerchImagesURL } from '../../../const';
import { LuCake } from 'react-icons/lu';
import { TbPencilHeart } from 'react-icons/tb';

export default function CheckoutSuccess() {
  const [order, setOrder] = useState({
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
          src: 'womens-sweatpants-front.png',
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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 2000; // 2 seconds

    // const pollOrderStatus = async () => {
    //   try {
    //     const res = await fetch(`/api/order-status?orderId=${orderId}`);
    //     const data = await res.json();

    //     if (!res.ok) throw new Error(data.error || 'Failed to fetch order');

    //     if (data.order.status === 'paid') {
    //       setOrder(data.order);
    //       setLoading(false);
    //     } else {
    //       if (attempts < maxAttempts - 1) {
    //         attempts++;
    //         setTimeout(pollOrderStatus, delay);
    //       } else {
    //         throw new Error(
    //           'Payment not confirmed yet. Try refreshing the page or contact support.'
    //         );
    //       }
    //     }
    //   } catch (err) {
    //     setError(err.message);
    //     setLoading(false);
    //   }
    // };

    // if (orderId) {
    //   pollOrderStatus();
    // } else {
    //   setError('Order ID not found in URL');
    //   setLoading(false);
    // }

    // Cleanup on unmount
    return () => {
      attempts = maxAttempts; // Stop polling if component unmounts
    };
  }, [orderId]);

  return (
    <div className="checkout-success">
      {loading ? (
        <div className="checkout-success_loader">
          <div>
            <ECLogoCake />
            <ImpulseSpinner
              frontColor="#ae9cf6"
              backColor="#C5B7FF"
              size={5}
              sizeUnit="em"
            />
          </div>
        </div>
      ) : (
        <>
          {error ? (
            <div className="checkout-success_error">
              <TiWarning />
              <p>{error}</p>
            </div>
          ) : (
            <div className="checkout-success_main">
              <h1>
                <FaMoneyCheckAlt />
                Payment Successful!
              </h1>
              <p>Thank you for your order, {order.customerInfo.name}.</p>
              <p>
                Your order <span className="order-id">#{order._id}</span> has
                been placed and successfully paid.
              </p>
              <p>
                We have also sent detailed information about the order to your
                email.
              </p>
              <div className="checkout-success_main_summary">
                <h2>Order Summary</h2>
                <div className="checkout-success_main_summary_items">
                  {order.items.map((item, i) => {
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
                      <div
                        key={i}
                        className="checkout-success_main_summary_items_item"
                      >
                        <div className="checkout-success_main_summary_items_item_image">
                          <BlurhashImage
                            src={`${
                              type === 'merch'
                                ? baseMerchImagesURL
                                : baseImagesURL
                            }/preview/${image.src}`}
                            hash={image.hash}
                          />
                        </div>
                        <div className="checkout-success_main_summary_items_item_details">
                          <div className="checkout-success_main_summary_items_item_details_main">
                            <p className="checkout-success_main_summary_items_item_title">
                              {quantity} x {title}
                            </p>
                            <div>
                              {option ? (
                                <p className="checkout-success_main_summary_items_item_options">
                                  {`${optionName}: `}
                                  <span>{option}</span>
                                </p>
                              ) : null}
                              {spongeVariant ? (
                                <p className="checkout-success_main_summary_items_item_sponge">
                                  Sponge: <span>{spongeVariant}</span>
                                </p>
                              ) : null}
                              {fillVariant ? (
                                <p className="checkout-success_main_summary_items_item_filling">
                                  Filling Icing: <span>{fillVariant}</span>
                                </p>
                              ) : null}
                              {merchVariants
                                ? Object.entries(merchVariants).map((it) => {
                                    return (
                                      <p
                                        key={it}
                                        className="checkout-success_main_summary_items_item_filling"
                                      >
                                        {it[0]}: <span>{it[1]}</span>
                                      </p>
                                    );
                                  })
                                : null}
                              {cakeSign ? (
                                <div className="checkout-success_main_summary_items_item_cake-sign">
                                  <span>
                                    <LuCake />
                                    Write on cake:
                                  </span>
                                  <p>{cakeSign}</p>
                                </div>
                              ) : null}
                              {cartMessage ? (
                                <div className="checkout-success_main_summary_items_item_card-message">
                                  <span>
                                    <TbPencilHeart />
                                    Card with handwritten text:
                                  </span>
                                  <p>{cartMessage}</p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <span className="checkout-success_main_summary_items_item_details_price">
                            ${price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="checkout-success_main_summary_shipping">
                  Shipping: ${order.shipping.cost}
                </p>
                <p className="checkout-success_main_summary_total">
                  Total: ${order.total.toFixed(2)}
                </p>
              </div>

              <Link to="/">
                <button className="checkout-success_home-page-btn">
                  Home Page
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
