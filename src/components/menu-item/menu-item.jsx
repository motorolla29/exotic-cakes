import { Link } from 'react-router-dom';

import './menu-item.sass';

const MenuItem = ({ id, title, price }) => {
  return (
    <div className="menu-item">
      <Link to={`${id}`}>
        <div className="menu-item_slider">
          <img
            className="menu-item_slider_img"
            src="/images/catalog/OIG1 (1).jpg"
            alt="product_image"
          ></img>
        </div>
        <div className="menu-item_info">
          <p className="menu-item_info_title">{title}</p>
          <p className="menu-item_info_price">{price}</p>
        </div>
      </Link>
    </div>
  );
};

export default MenuItem;
