import { observer } from 'mobx-react-lite';
import store from '../../store/store';

import './cart-snackbar.sass';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseImagesURL } from '../../const';
import { loadImagePromise } from '../../utils';

const CartSnackbar = observer(() => {
  const snackbar = store.snackbar;
  const cartItemsCount = store.cartItems.reduce((acc, it) => {
    return acc + it.quantity;
  }, 0);
  const cartItemsTotalCost = store.cartItems.reduce((acc, it) => {
    return acc + it.quantity * it.price;
  }, 0);
  const [productImageUrl, setProductImageUrl] = useState('');

  // useEffect(() => {
  //   setTimeout(() => {
  //     store.setSnackbar({ open: false });
  //   }, 4000);
  // }, [snackbar.item]);

  useEffect(() => {
    loadImagePromise(baseImagesURL, snackbar.item?.image)
      .then((url) => {
        setProductImageUrl(url);
      })
      .catch((defaultUrl) => {
        setProductImageUrl(defaultUrl);
      });
  }, [snackbar.item]);

  return (
    snackbar.item && (
      <div className="cart-snackbar">
        <div className="cart-snackbar_inner">
          <div className="cart-snackbar_inner_info">
            <img src={`${baseImagesURL}/${productImageUrl}`} />
            <div>
              <span>Added To Cart</span>
              <p>1 x {snackbar.item.title}</p>
            </div>
          </div>
          <Link to="/cart" className="cart-snackbar_inner_link">
            <span>{cartItemsCount}</span>
            <span>VIEW CART</span>
            <span>${cartItemsTotalCost}</span>
          </Link>
        </div>
      </div>
    )
  );
});

export default CartSnackbar;
