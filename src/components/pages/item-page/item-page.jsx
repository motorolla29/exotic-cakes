import { useParams } from 'react-router-dom';

import MENU from '../../../mocks/menu';
import ImageGallery from '../../image-gallery/image-gallery';

import './item-page.sass';
import ProductInfo from '../../product-info/product-info';

const ItemPage = () => {
  const { category } = useParams(category);
  const { id } = useParams(id);
  const item = MENU[category].find((it) => it.id == id);

  return (
    <div className="item-page">
      <ImageGallery item={item} />
      <ProductInfo item={item} />
    </div>
  );
};

export default ItemPage;
