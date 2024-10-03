import Slider from 'react-slick';
import useWindowSize from '../../hooks/use-window-size';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

import './image-gallery.sass';

const ImageGallery = ({ item: { images } }) => {
  const baseUrl = '/images/catalog';

  const [ww] = useWindowSize();

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
      return ww >= 768 ? (
        <a>
          <img src={`${baseUrl}/${images[0 + i]}`} />
        </a>
      ) : (
        <button></button>
      );
    },
    dots: true,
    infinite: images.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="image-gallery">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image}>
            <img src={`${baseUrl}/${image}`}></img>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageGallery;
