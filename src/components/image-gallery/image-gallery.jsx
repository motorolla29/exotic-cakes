import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';

import useWindowSize from '../../hooks/use-window-size';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { baseImagesURL } from '../../const';
import BlurhashImage from '../blurhash-image/blurhash-image';

import './image-gallery.sass';

const ImageGallery = ({ item, slideIndex, setSlideIndex }) => {
  const sliderRef = useRef(null);
  let [searchParams] = useSearchParams();
  const currentOption = searchParams.get('option');
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
    initialSlide: getInitialPhotoIndex(),
    customPaging: function (i) {
      return ww >= 768 ? (
        <a>
          <BlurhashImage
            src={`${baseImagesURL}/preview/${
              item.images ? item.images[0 + i].src : 'no-photo.png'
            }`}
            hash={
              item.images
                ? item.images[0 + i].hash
                : 'U5PZQXog_3azWBfQoffQ~qWB8_of%MfQM{fQ'
            }
          />
        </a>
      ) : (
        <button></button>
      );
    },
    dots: true,
    infinite: item.images?.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow:
      item.images && item.images.length > 1 ? <CustomNextArrow /> : <></>,
    prevArrow: item.images.length > 1 ? <CustomPrevArrow /> : <></>,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  function getInitialPhotoIndex() {
    if (item.options && currentOption) {
      const option = Object.values(item.options)[0].find((it) => {
        return it.name === currentOption;
      });
      if (option && option.photoIndex) {
        return option.photoIndex;
      }
      return 0;
    }
    return 0;
  }

  useEffect(() => {
    sliderRef.current.slickGoTo(slideIndex);
  }, [slideIndex]);

  return (
    <div className="image-gallery">
      <Slider ref={sliderRef} {...settings}>
        {item.images ? (
          item.images.map((image) => {
            return (
              <BlurhashImage
                key={image}
                src={`${baseImagesURL}/${image.src}`}
                hash={image.hash}
                withBackgroundCanvas
              />
            );
          })
        ) : (
          <BlurhashImage
            src={`${baseImagesURL}/no-photo.png`}
            hash="U5PZQXog_3azWBfQoffQ~qWB8_of%MfQM{fQ"
          />
        )}
      </Slider>
    </div>
  );
};

export default ImageGallery;
