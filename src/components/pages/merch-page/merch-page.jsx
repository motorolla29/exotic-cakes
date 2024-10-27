import MerchItem from '../../merch-item/merch-item';
import './merch-page.sass';

const MerchPage = () => {
  return (
    <div className="merch-page">
      <h1 className="merch-page_title">Merch Shop</h1>
      <div className="merch-items">
        {[...new Array(4)].map((_, index) => (
          <MerchItem name="jgrweg" key={index} />
        ))}
        {[...new Array(4)].map((_, index) => (
          <MerchItem
            name="dkfop fjkpowejfpo ewjgpo wejgpo wejpgjepojgrweg"
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default MerchPage;
