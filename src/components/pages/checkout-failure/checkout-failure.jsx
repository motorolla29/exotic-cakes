import { Link } from 'react-router-dom';

import './checkout-failure.sass';

const CheckoutFailure = () => {
  return (
    <div className="checkout-failure">
      <h1>Payment Failed</h1>
      <p>Something went wrong with your payment or you canceled the process.</p>
      <p>No worries — you can try again below.</p>
      <Link to="/cart">
        <button className="checkout-failure_return-btn">Return to Cart</button>
      </Link>
    </div>
  );
};

export default CheckoutFailure;
