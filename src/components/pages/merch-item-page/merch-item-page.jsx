import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './merch-item-page.sass';
import MerchItemPageImageGallery from '../../merch-item-page-image-gallery/merch-item-page-image-gallery';
import MerchInfo from '../../merch-info/merch-info';

const MerchItemPage = () => {
  const { merchItemId } = useParams();
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://66e43448d2405277ed137dfc.mockapi.io/merch/${merchItemId}`)
      .then((res) => {
        return res.json();
      })
      .then((item) => {
        setItem(item);
        setLoading(false);
      });
  }, []);

  return (
    <div className="merch-item-page-cover">
      <div className="merch-item-page">
        {loading ? (
          <>loading</>
        ) : (
          <>
            <MerchItemPageImageGallery item={item} />
            <MerchInfo item={item} />
          </>
        )}
      </div>
    </div>
  );
};

export default MerchItemPage;
