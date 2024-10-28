import { useEffect, useState } from 'react';
import MerchItem from '../../merch-item/merch-item';
import MerchItemSkeleton from '../../skeletons/merch-item-skeleton';
import './merch-page.sass';

const MerchPage = () => {
  const [items, setItems] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    setFirstLoading(true);
    fetch(`https://66e43448d2405277ed137dfc.mockapi.io/merch`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setFirstLoading(false);
      });
  }, []);
  return (
    <div className="merch-page">
      <h1 className="merch-page_title">Merch Shop</h1>
      <div className="merch-items">
        {firstLoading
          ? [...new Array(12)].map((_, index) => (
              <MerchItemSkeleton className="merch-item-skeleton" key={index} />
            ))
          : items.map((it) => (
              <MerchItem
                key={it.id}
                id={it.id}
                title={it.title}
                minPrice={
                  it.options ? Object.values(it.options)[0][0].price : null
                }
                price={it.price}
                images={it.images}
              />
            ))}
      </div>
    </div>
  );
};

export default MerchPage;
