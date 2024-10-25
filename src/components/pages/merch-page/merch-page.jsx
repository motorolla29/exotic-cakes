import MerchItem from '../../merch-item/merch-item';
import './merch-page.sass';

const MerchPage = () => {
  return (
    <div className="merch-page">
      <h1 className="merch-page_title">Merch Shop</h1>
      <div className="merch-items">
        {[...new Array(8)].map((_, index) => (
          <MerchItem key={index} />
        ))}
      </div>
    </div>
  );
};

export default MerchPage;
