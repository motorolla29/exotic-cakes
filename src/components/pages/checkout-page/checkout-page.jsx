import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import store from '../../../store/store';
import './checkout-page.sass';
import BlurhashImage from '../../blurhash-image/blurhash-image';
import { baseImagesURL, baseMerchImagesURL } from '../../../const';
import { TbPencilHeart } from 'react-icons/tb';
import { LuCake } from 'react-icons/lu';
import { PiMapPinAreaBold } from 'react-icons/pi';
import MainSelect from '../../../ui/main-select';
import CheckoutShippingMap from '../../checkout-shipping-map/checkout-shipping-map';
import axios from 'axios';
import 'maplibre-gl/dist/maplibre-gl.css';
import { validateFields } from './validate-fields';
import { COUNTRIES, CITIES } from '../../../const';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
const CheckoutPage = observer(() => {
  const navigate = useNavigate();
  const addressInputContainerRef = useRef();
  const [mapModalOpen, setMapModalOpen] = useState(false);

  const [notes, setNotes] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [city, setCity] = useState('London');
  const [postalCode, setPostalCode] = useState('');
  const [apartment, setApartment] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [addressSuggestionsLoading, setAddressSuggestionsLoading] =
    useState(false);
  const [noAddressResultsFound, setNoAddressResultsFound] = useState(false);
  const [deliveryCoords, setDeliveryCoords] = useState(null);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [deliveryAddressError, setDeliveryAddressError] = useState('');

  const orderSubtotal = store.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const orderTotal = orderSubtotal + shippingCost;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onAddressSuggestionSelect = (place) => {
    setDeliveryAddress(place.formatted);
    setAddressSuggestions([]);
    setDeliveryCoords({
      lat: place.geometry.lat,
      lng: place.geometry.lng,
    });
    if (place.components && place.components.postcode) {
      setPostalCode(place.components.postcode);
    }
  };

  const onAddressChange = async (e) => {
    const value = e.target.value;
    setDeliveryCoords(null);
    setDeliveryAddress(value);
    setDeliveryAddressError('');
    setPostalCodeError('');

    if (value.length < 3) return;

    setAddressSuggestionsLoading(true);
    setNoAddressResultsFound(false);

    try {
      const res = await axios.get(
        'https://api.opencagedata.com/geocode/v1/json',
        {
          params: {
            q: value,
            key: process.env.OPENCAGE_KEY,
            limit: 5,
            countrycode: 'gb',
            language: 'en',
            no_annotations: true,
          },
        }
      );

      setAddressSuggestions(res.data.results);
      if (res.data.results.length === 0) {
        setNoAddressResultsFound(true); // Set flag if no results found
      }
    } catch (error) {
      console.error('Geocoding error', error);
    } finally {
      setAddressSuggestionsLoading(false);
    }
  };

  const handleCheckout = async () => {
    const { isValid, errors } = validateFields({
      name,
      email,
      phoneNumber,
      address: deliveryAddress,
      postalCode,
      deliveryCoords,
    });
    console.log(errors);

    setNameError(errors.nameError || '');
    setEmailError(errors.emailError || '');
    setPhoneNumberError(errors.phoneNumberError || '');
    setPostalCodeError(errors.postalCodeError || '');
    setDeliveryAddressError(errors.addressError || '');

    if (!isValid) {
      return;
    }
    console.log('order');

    // if (store.cartItems.length === 0) {
    //   alert('Your cart is empty!');
    //   return;
    // }

    // const orderData = {
    //   items: store.cartItems,
    //   total: orderTotal,
    //   currency: 'usd',
    //   notes,
    //   customerInfo: {
    //     name,
    //     email,
    //     phoneNumber,
    //   },
    //   deliveryInfo: {
    //     country,
    //     city,
    //     postalCode,
    //     deliveryAddress,
    //     deliveryCoords,
    //   },
    // };

    // // Переход к API создания заказа
    // try {
    //   const res = await fetch('/api/create-order', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(orderData),
    //   });
    //   const data = await res.json();

    //   if (data.sessionId) {
    //     // Если используется Stripe JS, здесь можно вызвать redirectToCheckout
    //     // Например:
    //     // const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    //     // stripe.redirectToCheckout({ sessionId: data.sessionId });
    //     // Или выполнить редирект:
    //     window.location.href = data.redirectUrl || '/checkout-success';
    //   } else {
    //     // Обработка ошибки от API
    //     alert('Ошибка оформления заказа, попробуйте позже');
    //   }
    // } catch (error) {
    //   console.error('Ошибка при оформлении заказа:', error);
    //   alert('Ошибка при оформлении заказа');
    // }
  };

  const handlePhoneChange = (e) => {
    let inputValue = e.target.value;

    // Убираем все символы, кроме цифр
    inputValue = inputValue.replace(/\D/g, '');

    // Ограничиваем длину ввода до 11 цифр (потому что +44 занимает 3 символа)
    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11);
    }

    // Форматируем номер с пробелами
    if (inputValue.length <= 4) {
      inputValue = inputValue.slice(0, 4); // Максимум 4 цифры после +44
    } else if (inputValue.length <= 7) {
      inputValue = `${inputValue.slice(0, 4)} ${inputValue.slice(4, 7)}`; // 3 цифры + 3 цифры
    } else {
      inputValue = `${inputValue.slice(0, 4)} ${inputValue.slice(
        4,
        7
      )} ${inputValue.slice(7, 11)}`; // 4 цифры + 3 цифры + 3 цифры
    }

    // Добавляем префикс +44
    if (inputValue.length === 0) {
      inputValue = '+44';
    } else if (inputValue.length <= 3) {
      inputValue = `+44 ${inputValue}`;
    }

    setPhoneNumber(inputValue); // Обновляем состояние
  };
  return (
    <div
      className="checkout-page"
      onClick={(e) => {
        if (
          addressInputContainerRef.current &&
          !addressInputContainerRef.current.contains(e.target)
        ) {
          setAddressSuggestions([]);
          setAddressSuggestionsLoading(false);
          setNoAddressResultsFound(false);
        }
      }}
    >
      <Helmet>
        <title>Exotic Cakes - Checkout</title>
      </Helmet>
      <div className="checkout-page_header">
        <Link to="/" className="checkout-page_header_logo">
          <img src="/images/EC-logo-fullsize-optimized.webp" alt="logo" />
        </Link>
      </div>

      <div className="checkout-page_content">
        <h1 className="checkout-page_content_title">Checkout</h1>
        <div className="checkout-page_content_shipping">
          <h2>Shipping Info</h2>
          <div className="checkout-page_content_shipping_main">
            <div className="checkout-page_content_shipping_main_info">
              <div className="checkout-page_content_shipping_main_info_customer">
                <h3>Customer</h3>
                <div className="checkout-page_content_shipping_main_info_customer_fields">
                  <div className="main-field name">
                    <label htmlFor="name">Name*</label>
                    <input
                      className={`${nameError ? 'error' : ''}`}
                      id="name"
                      type="text"
                      onChange={(e) => {
                        setName(e.target.value);
                        setNameError('');
                      }}
                      value={name}
                      placeholder="John Peterson"
                    />
                    {nameError && (
                      <span className="error-text">{nameError}</span>
                    )}
                  </div>
                  <div className="main-field email">
                    <label htmlFor="email">Email*</label>
                    <input
                      className={`${emailError ? 'error' : ''}`}
                      id="email"
                      type="text"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      value={email}
                      placeholder="me@example.com"
                    />
                    {emailError && (
                      <span className="error-text">{emailError}</span>
                    )}
                  </div>
                  <div className="main-field phone">
                    <label htmlFor="phone">Phone</label>
                    <input
                      className={`${phoneNumberError ? 'error' : ''}`}
                      id="phone"
                      type="text"
                      maxLength={15}
                      onFocus={() => {
                        if (phoneNumber === '') {
                          setPhoneNumber('+44 ');
                        }
                      }}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                      }}
                      value={phoneNumber}
                      placeholder="+44 9999 999999"
                    />
                    {phoneNumberError && (
                      <span className="error-text">{phoneNumberError}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="checkout-page_content_shipping_main_info_delivery">
                <h3>Delivery Address</h3>
                <div className="checkout-page_content_shipping_main_info_delivery_fields">
                  <div className="main-field address">
                    <label htmlFor="address">Address</label>
                    <div
                      className="address-input-container"
                      ref={addressInputContainerRef}
                    >
                      <input
                        className={`${deliveryAddressError ? 'error' : ''}`}
                        id="address"
                        type="text"
                        onChange={onAddressChange}
                        value={deliveryAddress}
                        placeholder="Search address in London"
                      />
                      {addressSuggestionsLoading && (
                        <div className="loading-indicator">
                          <span>Loading...</span>
                        </div>
                      )}
                      {noAddressResultsFound && !addressSuggestionsLoading && (
                        <div className="no-results-message">
                          <span>
                            No addresses found... Please refine your search.
                          </span>
                        </div>
                      )}
                      {addressSuggestions.length > 0 &&
                        !addressSuggestionsLoading && (
                          <ul className="address-suggestions-list">
                            {addressSuggestions.map((place, i) => (
                              <li
                                className="address-suggestions-list_item"
                                key={i}
                                onClick={() => onAddressSuggestionSelect(place)}
                              >
                                {place.formatted}
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>
                    {deliveryAddressError && (
                      <span className="error-text">{deliveryAddressError}</span>
                    )}
                    <span
                      className="show-map"
                      onClick={() => setMapModalOpen(true)}
                    >
                      <PiMapPinAreaBold />
                      <span>Show on map</span>
                    </span>
                  </div>
                  <div className="main-field apartment">
                    <label htmlFor="apartment">
                      Apartment/Suite/Building (Optional)
                    </label>
                    <input
                      id="apartment"
                      type="text"
                      maxLength={25}
                      onChange={(e) => setApartment(e.target.value)}
                      value={apartment}
                    />
                  </div>
                  <div className="main-field postcode">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input
                      className={`${postalCodeError ? 'error' : ''}`}
                      id="postal-code"
                      type="text"
                      onChange={(e) => {
                        setPostalCode(e.target.value);
                        setPostalCodeError('');
                      }}
                      value={postalCode}
                    />
                    {postalCodeError && (
                      <span className="error-text">{postalCodeError}</span>
                    )}
                  </div>
                  <div className="main-select city">
                    <MainSelect
                      label="City"
                      options={CITIES}
                      currentOption={city}
                      setOption={setCity}
                    />
                  </div>
                  <div className="main-select country">
                    <MainSelect
                      label="Country"
                      options={COUNTRIES}
                      currentOption={country}
                      setOption={setCountry}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="checkout-page_content_order">
          <div className="checkout-page_content_order_items">
            <h2>Order Summary</h2>
            {store.cartItems.map((item, idx) => {
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
                  key={idx}
                  className="checkout-page_content_order_items_item"
                >
                  <div className="checkout-page_content_order_items_item_image">
                    <BlurhashImage
                      className="checkout-page_content_order_items_item_image"
                      src={`${
                        type === 'merch' ? baseMerchImagesURL : baseImagesURL
                      }/preview/${image.src}`}
                      hash={image.hash}
                    />
                  </div>
                  <div className="checkout-page_content_order_items_item_details">
                    <div className="checkout-page_content_order_items_item_details_main">
                      <p className="checkout-page_content_order_items_item_title">
                        {quantity} x {title}
                      </p>
                      <div>
                        {option ? (
                          <p className="cart-item_main_info_options">
                            {`${optionName}: `}
                            <span>{option}</span>
                          </p>
                        ) : null}
                        {spongeVariant ? (
                          <p className="cart-item_main_info_sponge">
                            Sponge: <span>{spongeVariant}</span>
                          </p>
                        ) : null}
                        {fillVariant ? (
                          <p className="cart-item_main_info_filling">
                            Filling Icing: <span>{fillVariant}</span>
                          </p>
                        ) : null}
                        {merchVariants
                          ? Object.entries(merchVariants).map((it) => {
                              return (
                                <p
                                  key={it}
                                  className="cart-item_main_info_filling"
                                >
                                  {it[0]}: <span>{it[1]}</span>
                                </p>
                              );
                            })
                          : null}
                        {cakeSign ? (
                          <div className="cart-item_main_info_cake-sign">
                            <span>
                              <LuCake />
                              Write on cake:
                            </span>
                            <p>{cakeSign}</p>
                          </div>
                        ) : null}
                        {cartMessage ? (
                          <div className="cart-item_main_info_card-message">
                            <span>
                              <TbPencilHeart />
                              Card with handwritten text:
                            </span>
                            <p>{cartMessage}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <span className="checkout-page_content_order_items_item_details_price">
                      ${price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="checkout-page_content_order_summary-section">
            <div className="checkout-page_content_order_summary-section_notes">
              <span>Notes:</span>
              <textarea
                maxLength={250}
                id="order-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="checkout-page_content_order_summary-section_counts">
              <div className="checkout-page_content_order_summary-section_counts_subtotal">
                <span>Subtotal</span>
                <span>${orderSubtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-page_content_order_summary-section_counts_shipping">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="checkout-page_content_order_summary-section_counts_total">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          className="checkout-page_content_checkout-btn"
        >
          Proceed to Payment
        </button>
        <AnimatePresence>
          {mapModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="map-modal-overlay"
              onClick={(e) => {
                if (e.target.classList.contains('map-modal-overlay')) {
                  setMapModalOpen(false);
                }
              }}
            >
              <button
                className="close-map-btn"
                onClick={() => setMapModalOpen(false)}
              >
                &times;
              </button>
              <motion.div
                initial={{ scale: 0.2 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.2 }}
                className="map-modal-content"
              >
                <CheckoutShippingMap
                  onAddressConfirm={(address) => {
                    setDeliveryAddress(address.label);
                    setDeliveryCoords(address.coords);
                    setPostalCode(address.postcode);
                  }}
                  setError={setDeliveryAddressError}
                  confirmedAddress={deliveryAddress}
                  closeMap={() => setMapModalOpen(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default CheckoutPage;
