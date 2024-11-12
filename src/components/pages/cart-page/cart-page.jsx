import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import useWindowSize from '../../../hooks/use-window-size';
import CartItem from '../../cart-item/cart-item';
import store from '../../../store/store';

import './cart-page.sass';

const CartPage = observer(() => {
  const [ww] = useWindowSize();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return store.cartItems.length ? (
    <div className="cart-page">
      <h1 className="cart-page_title">YOUR ORDER</h1>
      <div className="cart-page_heading">
        <span className="cart-page_heading_item">Item</span>
        {ww > 768 ? (
          <>
            <span className="cart-page_heading_price">Price</span>
            <span className="cart-page_heading_quantity">Quantity</span>
          </>
        ) : null}
        <span className="cart-page_heading_total">Total</span>
      </div>

      <div className="cart-page_items">
        {store.cartItems.map((it) => (
          <CartItem key={JSON.stringify(it)} item={it} />
        ))}
      </div>

      <div className="cart-page_order-summary">
        <h2 className="cart-page_order-summary_title">ORDER SUMMARY</h2>
        <div className="cart-page_order-summary_notes">
          <span>NOTES</span>
          <textarea />
        </div>
        <div className="cart-page_order-summary_count">
          <span>SUBTOTAL</span>
          <span>
            $
            {store.cartItems.reduce((acc, it) => {
              return acc + it.quantity * it.price;
            }, 0)}
          </span>
        </div>
        <button className="cart-page_order-summary_checkout-btn">
          CHECKOUT
        </button>
        <p className="cart-page_order-summary_description">
          Tax included. <span>Shipping</span> calculated at checkout.
        </p>
      </div>
    </div>
  ) : (
    <div className="empty-cart">
      <img className="empty-cart_image" src="/images/empty-cart.png" />
      <h1 className="empty-cart_title">YOUR CART IS EMPTY</h1>
      <p className="empty-cart_subtitle">
        Ready to look for something incredibly tasty?
      </p>
      <Link to="/menus" className="empty-cart_link">
        CONTINUE SHOPPING
      </Link>
    </div>
  );
});

export default CartPage;
