import { useParams } from 'react-router-dom';
import './item-page.sass';

const ItemPage = () => {
  const { id } = useParams(id);
  return <div className="item-page">{id}</div>;
};

export default ItemPage;
