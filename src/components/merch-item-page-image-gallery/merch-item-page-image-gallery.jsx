import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';

import { BiSolidLeftArrow } from 'react-icons/bi';
import { BiSolidRightArrow } from 'react-icons/bi';
import { baseMerchImagesURL } from '../../const';

import './merch-item-page-image-gallery.sass';
import { useSearchParams } from 'react-router-dom';
import { option } from 'framer-motion/client';

const MerchItemPageImageGallery = ({
  item,
  images,
  slideIndex,
  setSlideIndex,
}) => {
  const [searchParams] = useSearchParams();
  const currentOption = searchParams.get('option');
  const currentVariants = searchParams.get('variants');
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  useEffect(() => {
    sliderRef1.slickGoTo(slideIndex);
  }, [slideIndex]);

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <div className="next-arrow" onClick={onClick}>
        <BiSolidRightArrow />
      </div>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="prev-arrow" onClick={onClick}>
        <BiSolidLeftArrow />
      </div>
    );
  }

  const getInitialPhotoIndex = () => {
    if (item.options && currentOption) {
      const option = Object.values(item.options)[0].find((it) => {
        return it.name === currentOption;
      });
      if (option && option.photoIndex) {
        return option.photoIndex;
      }
      return 0;
    }
    if (item.variants && currentVariants) {
      const variants = Object.entries(JSON.parse(currentVariants)).map((it) => {
        return item.variants[it[0]].find((item) => {
          if (item === it[1] || item.name === it[1]) {
            return item;
          }
        });
      });
      const firstVariantWithPhotoIndex = variants.find((it) => {
        return it.photoIndex;
      });
      if (firstVariantWithPhotoIndex) {
        return firstVariantWithPhotoIndex.photoIndex;
      }
      return 0;
    }
    return 0;
  };

  return (
    <div className="merch-item-page-image-gallery">
      <div className="merch-item-page-image-gallery_sliders-block">
        <Slider
          initialSlide={getInitialPhotoIndex()}
          className="main-slider"
          asNavFor={nav2}
          ref={(slider) => (sliderRef1 = slider)}
          arrows={false}
          infinite={item.images.length > 1}
          adaptiveHeight
          beforeChange={(current, next) => {
            setSlideIndex(next);
          }}
        >
          {images.map((it) => {
            return (
              <img
                key={it}
                src={`${baseMerchImagesURL}/${it}`}
                alt="merch_image"
              />
            );
          })}
        </Slider>
        <Slider
          className="nav-slider"
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
          slidesToShow={images.length === 2 ? 2 : 3}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={item.images.length > 1}
        >
          {images.map((it) => {
            return (
              <img
                key={it}
                src={`${baseMerchImagesURL}/${it}`}
                alt="merch_image"
              />
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MerchItemPageImageGallery;
