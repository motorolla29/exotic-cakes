import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import ImageGallery from '../../image-gallery/image-gallery';
import ProductInfo from '../../product-info/product-info';
import ImageGallerySkeleton from '../../skeletons/image-gallery-skeleton';
import ProductInfoSkeleton from '../../skeletons/product-info-skeleton';
import useWindowSize from '../../../hooks/use-window-size';

import './item-page.sass';

const ItemPage = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState({});
  const [gallerySlideImageIndex, setGallerySlideImageIndex] =
    useState(undefined);
  const [loading, setLoading] = useState(true);
  const [ww] = useWindowSize();

  useEffect(() => {
    window.scrollTo(0, 0);
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

  useEffect(() => {
    async function fetchItem() {
      try {
        setLoading(true);
        const res = await fetch(`/api/items/${id}`);
        if (!res.ok) throw new Error('Failed to fetch item');
        const { item } = await res.json();
        setItem(item);
      } catch (error) {
        console.error('Error loading item:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchItem();
    }
  }, []);

  return (
    <div className="item-page">
      <Helmet>
        <title>{item?.title ? item.title : 'Exotic Cakes'}</title>
      </Helmet>
      {loading ? (
        <div className="item-page-skeletons">
          <ImageGallerySkeleton className="image-gallery image-gallery-skeleton" />
          <ProductInfoSkeleton className="product-info product-info-skeleton" />
        </div>
      ) : (
        <>
          <ImageGallery
            item={item}
            slideIndex={gallerySlideImageIndex}
            setSlideIndex={setGallerySlideImageIndex}
          />
          <ProductInfo
            category={category}
            item={item}
            setPhotoIndex={setGallerySlideImageIndex}
          />
        </>
      )}
    </div>
  );
};

export default ItemPage;
