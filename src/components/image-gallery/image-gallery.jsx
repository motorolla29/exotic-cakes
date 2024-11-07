import { useEffect, useRef } from 'react';
import Slider from 'react-slick';

import useWindowSize from '../../hooks/use-window-size';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { baseImagesURL } from '../../const';

import './image-gallery.sass';
import { useSearchParams } from 'react-router-dom';

const ImageGallery = ({ item, images, slideIndex, setSlideIndex }) => {
  const sliderRef = useRef(null);
  let [searchParams] = useSearchParams();
  const currentOption = searchParams.get('option');
  //const currentVariants = searchParams.get('variants');
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
          <img
            src={`${baseImagesURL}/${images ? images[0 + i] : 'no-photo.png'}`}
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
    nextArrow: images && images.length > 1 ? <CustomNextArrow /> : <></>,
    prevArrow: images.length > 1 ? <CustomPrevArrow /> : <></>,
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
    // if (item.variants && currentVariants) {
    //   const variants = Object.entries(JSON.parse(currentVariants)).map((it) => {
    //     return item.variants[it[0]].find((item) => {
    //       if (item === it[1] || item.name === it[1]) {
    //         return item;
    //       }
    //     });
    //   });
    //   const firstVariantWithPhotoIndex = variants.find((it) => {
    //     return it.photoIndex;
    //   });
    //   if (firstVariantWithPhotoIndex) {
    //     return firstVariantWithPhotoIndex.photoIndex;
    //   }
    //   return 0;
    // }
    return 0;
  }

  useEffect(() => {
    sliderRef.current.slickGoTo(slideIndex);
  }, [slideIndex]);

  return (
    <div className="image-gallery">
      <Slider ref={sliderRef} {...settings}>
        {images ? (
          images.map((image) => {
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
