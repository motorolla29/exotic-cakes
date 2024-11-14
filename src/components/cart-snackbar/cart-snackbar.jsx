import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';

import store from '../../store/store';
import { baseImagesURL, baseMerchImagesURL } from '../../const';
import BlurhashImage from '../blurhash-image/blurhash-image';

import './cart-snackbar.sass';

const CartSnackbar = observer(() => {
  const snackbar = store.snackbar;
  const snackbarRef = useRef();
  const navigate = useNavigate();
  const cartItemsCount = store.cartItems.reduce((acc, it) => {
    return acc + it.quantity;
  }, 0);
  const cartItemsTotalCost = store.cartItems.reduce((acc, it) => {
    return acc + it.quantity * it.price;
  }, 0);

  const [timerPaused, setTimerPaused] = useState(false);
  const [timerOver, setTimerOver] = useState(false);
  const [time, setTime] = useState(4);

  const tick = () => {
    if (timerPaused || timerOver) return;

    if (time === 0) {
      setTimerOver(true);
    } else {
      setTime(time - 1);
    }
  };

  const reset = () => {
    setTime(4);
    setTimerPaused(false);
    setTimerOver(false);
  };

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    store.setSnackbar({ open: false });
  }, [navigate]);

  useEffect(() => {
    reset();
  }, [snackbar.item]);

  return (
    <AnimatePresence>
      {snackbar.item && !timerOver && (
        <motion.div
          ref={snackbarRef}
          initial={{ opacity: 0, transform: 'translateY(-2em)' }}
          animate={{ opacity: 1, transform: 'translateY(0)' }}
          exit={{ opacity: 0, transform: 'translateY(-2em)' }}
          onMouseEnter={() => setTimerPaused(true)}
          onMouseLeave={() => reset()}
          className="cart-snackbar"
        >
          <div className="cart-snackbar_inner">
            <div className="cart-snackbar_inner_info">
              <div className="cart-snackbar_inner_info_img">
                <BlurhashImage
                  src={`${
                    snackbar.item.type === 'merch'
                      ? baseMerchImagesURL
                      : baseImagesURL
                  }/preview/${snackbar.item.image.src}`}
                  hash={snackbar.item.image.hash}
                />
              </div>
              <div className="cart-snackbar_inner_info_main">
                <span>ADDED TO CART</span>
                <p>1 x {snackbar.item.title}</p>
              </div>
            </div>
            <Link to="/cart" className="cart-snackbar_inner_link">
              <span>{cartItemsCount}</span>
              <span>VIEW CART</span>
              <span>${cartItemsTotalCost}</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

export default CartSnackbar;
