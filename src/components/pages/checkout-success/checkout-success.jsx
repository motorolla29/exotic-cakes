import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import BlurhashImage from '../../blurhash-image/blurhash-image';
import { baseImagesURL, baseMerchImagesURL } from '../../../const';

import { ImpulseSpinner } from 'react-spinners-kit';
import { TiWarning } from 'react-icons/ti';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import ECLogoCake from '../../../icons/cake-svg.svg';
import { LuCake } from 'react-icons/lu';
import { TbPencilHeart } from 'react-icons/tb';

import './checkout-success.sass';

export default function CheckoutSuccess() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 5;
    const delay = 2000;

    const pollOrderStatus = async () => {
      try {
        const res = await fetch(`/api/order-status?orderId=${orderId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch order');

        if (data.order.status === 'paid') {
          setOrder(data.order);
          setLoading(false);
        } else {
          if (attempts < maxAttempts - 1) {
            attempts++;
            setTimeout(pollOrderStatus, delay);
          } else {
            throw new Error(
              'Payment not confirmed yet. Try refreshing the page or contact support.'
            );
          }
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (orderId) {
      pollOrderStatus();
    } else {
      setError('Order ID not found in URL');
      setLoading(false);
    }

    // Cleanup on unmount
    return () => {
      attempts = maxAttempts; // Stop polling if component unmounts
    };
  }, [orderId]);

  useEffect(() => {
    if (order?.status === 'paid') {
      localStorage.removeItem('cart');
    }
  }, [order]);

  return (
    <div className="checkout-success">
      {loading || !order ? (
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
              <h2>
                <FaMoneyCheckAlt />
                Payment Successful!
              </h2>
              <p>Thank you for your order, {order.customerInfo.name}.</p>
              <p>
                Your order{' '}
                <span className="order-id">#{order.orderMumber}</span> has been
                placed and successfully paid.
              </p>
              <p>
                We have also sent detailed information about the order to your
                email.
              </p>
              <div className="checkout-success_main_summary">
                <h3>Order Summary</h3>
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
                  <span>Shipping</span>
                  <span>${order.shipping.cost}</span>
                </p>
                <p className="checkout-success_main_summary_total">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </p>
              </div>

              <Link className="checkout-success_home-page-link" to="/">
                <button>Home Page</button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
