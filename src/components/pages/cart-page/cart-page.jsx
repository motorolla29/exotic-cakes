import store from '../../store/store';

import './cart-page.sass';

const CartPage = () => {
  return (
    <div className="cart-page">
      <h1 className="cart-page_title">YOUR ORDER</h1>
      <div className="cart-page_heading">
        <span>Item</span>
        <span>Price</span>
        <span>Quantity</span>
        <span>Total</span>
      </div>
      {store.cartItems.map((it) => {
        const { title, price, quantity } = it;
        return (
          <div key={JSON.stringify(it)} className="cart-item">
            <div className="cart-item_main">{title}</div>
            <p className="cart-item_price">${price}</p>
            <div className="cart-item_counter">
              <input />
              <label></label>
            </div>
            <p className="cart-item_total">${price * quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CartPage;
