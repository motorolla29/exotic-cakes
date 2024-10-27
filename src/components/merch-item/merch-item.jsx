import { Link } from 'react-router-dom';
import { baseMerchImagesURL } from '../../const';
import './merch-item.sass';

const MerchItem = ({ id, title, minPrice, price, images }) => {
  return (
    <Link to={`/merch/${id}`} className="merch-item">
      <div className="merch-item_image">
        <img src={`${baseMerchImagesURL}/${images[0]}`} alt="merch_img" />
      </div>
      <div className="merch-item_info">
        <p className="merch-item_info_name">{title}</p>
        <p className="merch-item_info_price">
          {minPrice ? `From $${minPrice}` : `$${price}`}
        </p>
      </div>
    </Link>
  );
};

export default MerchItem;
