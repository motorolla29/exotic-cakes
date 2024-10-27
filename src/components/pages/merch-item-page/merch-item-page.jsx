import { useParams } from 'react-router-dom';
import './merch-item-page.sass';

const MerchItemPage = () => {
  const { merchItemId } = useParams();

  return <div>{merchItemId}</div>;
};

export default MerchItemPage;
