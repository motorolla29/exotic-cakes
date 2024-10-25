import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImageGallery from '../../image-gallery/image-gallery';
import ProductInfo from '../../product-info/product-info';
import ImageGallerySkeleton from '../../skeletons/image-gallery-skeleton';
import ProductInfoSkeleton from '../../skeletons/product-info-skeleton';

import './item-page.sass';

const ItemPage = () => {
  const { category } = useParams();
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://66e43448d2405277ed137dfc.mockapi.io/items/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((item) => {
        setItem(item);
        setLoading(false);
      });
  }, []);

  return (
    <div className="item-page">
      {loading ? (
        <div className="item-page-skeletons">
          <ImageGallerySkeleton className="image-gallery image-gallery-skeleton" />
          <ProductInfoSkeleton className="product-info product-info-skeleton" />
        </div>
      ) : (
        <>
          <ImageGallery item={item} />
          <ProductInfo category={category} item={item} />
        </>
      )}
    </div>
  );
};

export default ItemPage;
