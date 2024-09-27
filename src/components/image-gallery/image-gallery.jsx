import Slider from 'react-slick';

import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

import './image-gallery.sass';
import { useState } from 'react';

const ImageGallery = ({ item: { images } }) => {
  const baseUrl = '/images/catalog';
  const [hovered, setHovered] = useState(false);

  function CustomNextArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-arrow-next" onClick={onClick}>
        <IoIosArrowRoundForward />
      </div>
    );
  }

  function CustomPrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="custom-arrow-prev" onClick={onClick}>
        <IoIosArrowRoundBack />
      </div>
    );
  }

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={`${baseUrl}/${images[0 + i]}`} />
        </a>
      );
    },

    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="image-gallery">
      <Slider
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...settings}
      >
        {images.map((image) => (
          <div>
            <img src={`${baseUrl}/${image}`}></img>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGallery;
