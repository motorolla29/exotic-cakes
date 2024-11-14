import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { baseImagesURL } from '../../const';
import BlurhashImage from '../blurhash-image/blurhash-image';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './menu-item.sass';

const MenuItem = ({ category, id, title, minPrice, price, images }) => {
  return (
    <Link className="menu-item" to={`/menus/${category}/${id}`}>
      <div className="menu-item_slider-container">
        <Slider
          infinite={images.length > 1 ? true : false}
          arrows={false}
          dots={true}
          className="menu-item_slider"
        >
          {images ? (
            images.map((image) => (
              <div key={image} className="menu-item_slider_img">
                <BlurhashImage
                  src={`${baseImagesURL}/preview/${image.src}`}
                  hash={image.hash}
                />
              </div>
            ))
          ) : (
            <div className="menu-item_slider_img">
              <img src={`${baseImagesURL}/no-photo.png`} alt="no_image" />
            </div>
          )}
        </Slider>
      </div>
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
