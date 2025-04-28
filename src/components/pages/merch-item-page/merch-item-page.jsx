import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MerchItemPageImageGallery from '../../merch-item-page-image-gallery/merch-item-page-image-gallery';
import MerchInfo from '../../merch-info/merch-info';
import MerchItemPageImageGallerySkeleton from '../../skeletons/merch-item-page-image-gallery-skeleton';
import MerchInfoSkeleton from '../../skeletons/merch-info-skeleton';

import useWindowSize from '../../../hooks/use-window-size';

import './merch-item-page.sass';

const MerchItemPage = () => {
  const { merchItemId } = useParams();
  const [item, setItem] = useState({});
  const [gallerySlideImageIndex, setGallerySlideImageIndex] =
    useState(undefined);
  const [loading, setLoading] = useState(true);
  const [ww] = useWindowSize();

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    async function fetchMerchItem() {
      try {
        setLoading(true);
        const res = await fetch(`/api/merch/${merchItemId}`);
        if (!res.ok) throw new Error('Failed to fetch merch item');
        const { merch } = await res.json();
        setItem(merch);
      } catch (error) {
        console.error('Error loading merch item:', error);
      } finally {
        setLoading(false);
      }
    }

    if (merchItemId) {
      fetchMerchItem();
    }
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
              slideIndex={gallerySlideImageIndex}
              setSlideIndex={setGallerySlideImageIndex}
            />
            <MerchInfo item={item} setPhotoIndex={setGallerySlideImageIndex} />
          </>
        )}
      </div>
    </div>
  );
};

export default MerchItemPage;
