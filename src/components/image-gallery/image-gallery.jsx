import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import useWindowSize from '../../hooks/use-window-size';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { baseImagesURL } from '../../const';
import { loadImagePromise } from '../../utils';

import './image-gallery.sass';

const ImageGallery = ({ item: { images } }) => {
  const [loadedImagesUrls, setLoadedImagesUrls] = useState([]);
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
          <img
            src={`${baseImagesURL}/${
              loadedImagesUrls || images
                ? loadedImagesUrls[0 + i]
                : 'no-photo.png'
            }`}
          />
        </a>
      ) : (
        <button></button>
      );
    },
    dots: true,
    infinite: images?.length > 1 ? true : false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: images && images.length > 1 ? <CustomNextArrow /> : null,
    prevArrow: images && images.length > 1 ? <CustomPrevArrow /> : null,
  };

  useEffect(() => {
    Promise.all(
      images.map((image) => {
        return loadImagePromise(baseImagesURL, image)
          .then((url) => {
            return url;
          })
          .catch((defaultUrl) => {
            return defaultUrl;
          });
      })
    ).then((arr) => {
      setLoadedImagesUrls(arr);
    });
  }, []);

  return (
    <div className="image-gallery">
      <Slider {...settings}>
        {images ? (
          loadedImagesUrls.map((image) => {
            return <img key={image} src={`${baseImagesURL}/${image}`} />;
          })
        ) : (
          <div>
            <img src={`${baseImagesURL}/no-photo.png`} />
          </div>
        )}
      </Slider>
    </div>
  );
};

export default ImageGallery;
