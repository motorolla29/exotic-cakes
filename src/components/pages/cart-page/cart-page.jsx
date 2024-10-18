import { observer } from 'mobx-react-lite';
import useWindowSize from '../../../hooks/use-window-size';
import CartItem from '../../cart-item/cart-item';
import store from '../../../store/store';

import './cart-page.sass';

const CartPage = observer(() => {
  window.scrollTo(0, 0);
  const [ww] = useWindowSize();

  return (
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
          <CartItem key={it.id} item={it} />
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
          <span>$1500</span>
        </div>
        <button className="cart-page_order-summary_checkout-btn">
          CHECKOUT
        </button>
        <p className="cart-page_order-summary_description">
          Tax included. <span>Shipping</span> calculated at checkout.
        </p>
      </div>
    </div>
  );
});

export default CartPage;
