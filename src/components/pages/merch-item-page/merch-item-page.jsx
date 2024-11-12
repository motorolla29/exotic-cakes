import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import MerchItemPageImageGallery from '../../merch-item-page-image-gallery/merch-item-page-image-gallery';
import MerchInfo from '../../merch-info/merch-info';
import MerchItemPageImageGallerySkeleton from '../../skeletons/merch-item-page-image-gallery-skeleton';
import MerchInfoSkeleton from '../../skeletons/merch-info-skeleton';

import { loadImagePromise } from '../../../utils';
import { baseMerchImagesURL } from '../../../const';
import useWindowSize from '../../../hooks/use-window-size';

import './merch-item-page.sass';

const MerchItemPage = () => {
  const { merchItemId } = useParams();
  const [item, setItem] = useState({});
  const [gallerySlideImageIndex, setGallerySlideImageIndex] =
    useState(undefined);
  const [loadedImagesUrls, setLoadedImagesUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ww] = useWindowSize();

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://66e43448d2405277ed137dfc.mockapi.io/merch/${merchItemId}`)
      .then((res) => {
        return res.json();
      })
      .then((item) => {
        setItem(item);
        return item;
      })
      .then((item) => {
        return Promise.all(
          item.images.map((image) => {
            return loadImagePromise(baseMerchImagesURL, image)
              .then((url) => {
                return url;
              })
              .catch((defaultUrl) => {
                return defaultUrl;
              });
          })
        );
      })
      .then((arr) => {
        setLoadedImagesUrls(arr);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (ww <= 768) {
      document
        .querySelector('.header-drip')
        .style.setProperty('display', 'none');
    }
    return () => {
      if (ww <= 768)
        document
          .querySelector('.header-drip')
          .style.setProperty('display', 'block');
    };
  });

  return (
    <div className="merch-item-page-cover">
      <div className="merch-item-page">
        {loading ? (
          <div className="merch-item-page-skeletons">
            <MerchItemPageImageGallerySkeleton className="merch-item-page-image-gallery merch-item-page-image-gallery-skeleton" />
            <MerchInfoSkeleton className="merch-info merch-info-skeleton" />
          </div>
        ) : (
          <>
            <MerchItemPageImageGallery
              item={item}
              images={loadedImagesUrls}
              slideIndex={gallerySlideImageIndex}
              setSlideIndex={setGallerySlideImageIndex}
            />
            <MerchInfo
              item={item}
              images={loadedImagesUrls}
              setPhotoIndex={setGallerySlideImageIndex}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MerchItemPage;
