import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './menu-item.sass';

const MenuItem = ({ category, id, title, price, images }) => {
  return (
    <Link className="menu-item" to={`/menus/${category}/${id}`}>
      <Slider
        infinite={0 > 1 ? true : false}
        arrows={false}
        dots={true}
        className="menu-item_slider"
      >
        <img
          className="menu-item_slider_img"
          src="/images/catalog/OIG1 (1).jpg"
          alt="product_image"
        />
        <img
          className="menu-item_slider_img"
          src="/images/catalog/OIG1 (2).jpg"
          alt="product_image"
        />
        <img
          className="menu-item_slider_img"
          src="/images/catalog/OIG1 (3).jpg"
          alt="product_image"
        />
      </Slider>
      <div className="menu-item_info">
        <p className="menu-item_info_title">{title}</p>
        <p className="menu-item_info_price">From ${price}</p>
      </div>
    </Link>
  );
};

export default MenuItem;
