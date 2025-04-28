import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import MerchItem from '../../merch-item/merch-item';
import MerchItemSkeleton from '../../skeletons/merch-item-skeleton';

import './merch-page.sass';

const MerchPage = () => {
  const [items, setItems] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  window.scrollTo(0, 0);

  useEffect(() => {
    async function fetchMerch() {
      setInitialLoading(true);
      try {
        const res = await fetch(`/api/merch`);
        const { items: dataItems } = await res.json();
        setItems(dataItems);
      } catch (err) {
        console.error('Failed to fetch merch items:', err);
      } finally {
        setInitialLoading(false);
      }
    }

    fetchMerch();
  }, []);
  return (
    <div className="merch-page">
      <Helmet>
        <title>Exotic Cakes - Merch</title>
      </Helmet>
      <h1 className="merch-page_title">Merch Shop</h1>
      <div className="merch-items">
        {initialLoading
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
