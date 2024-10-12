import { useEffect, useState } from 'react';
import store from '../store/store';
import MenuItem from '../menu-item/menu-item';
import MenuItemSkeleton from '../menu-item-skeleton/menu-item-skeleton';
import OverlayLogoSpinner from '../overlay-logo-spinner/overlay-logo-spinner';

import './menu-items.sass';
import { observer } from 'mobx-react-lite';

const MenuItems = observer(({ category }) => {
  const [items, setItems] = useState([]);
  const [firstLoading, setFirstLoading] = useState(false);
  const [limit, setLimit] = useState(24);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setFirstLoading(true);
    fetch(
      `https://66e43448d2405277ed137dfc.mockapi.io/items${
        category === 'all' ? '' : `?category=${category}`
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setTotalItems(arr.length);
        setLimit(24);
        arr.length > 24 ? (arr.length = 24) : null;
        setItems(arr);
        setFirstLoading(false);
      });
  }, [category]);

  const onSeeMoreButtonClickHandler = () => {
    store.setOverlaySpinner(true);
    fetch(
      `https://66e43448d2405277ed137dfc.mockapi.io/items${
        category === 'all' ? '' : `?category=${category}`
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setTotalItems(arr.length);
        if (totalItems > limit + 24) {
          arr.length = limit + 24;
        }
        setItems(arr);
        store.setOverlaySpinner(false);
        setLimit(limit + 24);
      });
  };

  return (
    <div className="menu-items-container">
      <div className="menu-items">
        {firstLoading
          ? [...new Array(24)].map((_, index) => (
              <MenuItemSkeleton key={index} />
            ))
          : items.map((it) => (
              <MenuItem
                key={it.id}
                category={category}
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
      {totalItems > limit && (
        <button
          onClick={onSeeMoreButtonClickHandler}
          className="see-more-button"
        >
          SEE MORE
        </button>
      )}
      {store.overlaySpinner && <OverlayLogoSpinner />}
    </div>
  );
});

export default MenuItems;
