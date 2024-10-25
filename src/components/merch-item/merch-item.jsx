import { Link } from 'react-router-dom';
import './merch-item.sass';

const MerchItem = () => {
  return (
    <Link className="merch-item">
      <div className="merch-item_image">
        <img
          src="/images/merch/ea18b41bef7d659ddeb1e30ab5b41facdc6e63e2.png"
          alt="merch_img"
        />
      </div>
      <div className="merch-item_info">
        <p className="merch-item_info_name">Merch Name</p>
        <p className="merch-item_info_price">$500</p>
      </div>
    </Link>
  );
};

export default MerchItem;
