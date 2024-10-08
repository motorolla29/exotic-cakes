import { useParams } from 'react-router-dom';

import MENU from '../../../mocks/menu.json';
import ImageGallery from '../../image-gallery/image-gallery';
import ProductInfo from '../../product-info/product-info';

import './item-page.sass';
import { useEffect } from 'react';

const ItemPage = () => {
  const { category } = useParams(category);
  const { id } = useParams(id);
  const item = MENU.find((it) => it.id == id);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="item-page">
      <ImageGallery item={item} />
      <ProductInfo item={item} />
    </div>
  );
};

export default ItemPage;
