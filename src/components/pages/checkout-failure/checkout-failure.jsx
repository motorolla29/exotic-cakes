import { Link } from 'react-router-dom';

import { TiWarning } from 'react-icons/ti';

import './checkout-failure.sass';

const CheckoutFailure = () => {
  return (
    <div className="checkout-failure">
      <div>
        <div>
          <TiWarning />
          <p>Payment Failed</p>
        </div>
        <p>
          Something went wrong with your payment or you canceled the process.
        </p>
        <p>No worries — you can try again below.</p>
        <Link to="/cart">Return to Cart</Link>
      </div>
    </div>
  );
};

export default CheckoutFailure;
