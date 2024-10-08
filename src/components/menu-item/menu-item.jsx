import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { baseImagesURL } from '../../const';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './menu-item.sass';

const MenuItem = ({ category, id, title, minPrice, price, images }) => {
  return (
    <Link className="menu-item" to={`/menus/${category}/${id}`}>
      <Slider
        infinite={0 > 1 ? true : false}
        arrows={false}
        dots={true}
        className="menu-item_slider"
      >
        {images ? (
          images.map((image) => (
            <img
              key={image}
              className="menu-item_slider_img"
              src={`${baseImagesURL}/${image}`}
              alt="product_image"
            />
          ))
        ) : (
          <img
            className="menu-item_slider_img"
            src={`${baseImagesURL}/no-photo.png`}
            alt="product_image"
          />
        )}
      </Slider>
      <div className="menu-item_info">
        <p className="menu-item_info_title">{title}</p>
        <p className="menu-item_info_price">
          {minPrice ? `From $${minPrice}` : `$${price}`}
        </p>
      </div>
    </Link>
  );
};

export default MenuItem;
