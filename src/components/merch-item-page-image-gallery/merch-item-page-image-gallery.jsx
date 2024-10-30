import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';

import { BiSolidLeftArrow } from 'react-icons/bi';
import { BiSolidRightArrow } from 'react-icons/bi';

import './merch-item-page-image-gallery.sass';
import { baseMerchImagesURL } from '../../const';

const MerchItemPageImageGallery = ({ item }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

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

  return (
    <div className="merch-item-page-image-gallery">
      <div className="merch-item-page-image-gallery_sliders-block">
        <Slider
          className="main-slider"
          asNavFor={nav2}
          ref={(slider) => (sliderRef1 = slider)}
          arrows={false}
          infinite={item.images.length > 1}
          adaptiveHeight
        >
          {item.images.map((it) => {
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
          slidesToShow={item.images.length === 2 ? 2 : 3} //item.images.length < 3 ? item.images.length : 3
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={item.images.length > 1}
        >
          {item.images.map((it) => {
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
