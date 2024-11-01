import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MenuItemSkeleton from '../skeletons/menu-item-skeleton';

import store from '../../store/store';
import MenuItem from '../menu-item/menu-item';
import OverlayLogoSpinner from '../overlay-logo-spinner/overlay-logo-spinner';

import './menu-items.sass';

const MenuItems = observer(({ category }) => {
  const [items, setItems] = useState([]);
  const [firstLoading, setFirstLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (store.locationKey !== location.key) {
      store.setMenuItemsLimit(24);
      store.setLocationKey(location.key);
    }
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
        arr.length > store.menuItemsLimit
          ? (arr.length = store.menuItemsLimit)
          : null;
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
        if (totalItems > store.menuItemsLimit + 24) {
          arr.length = store.menuItemsLimit + 24;
        }
        setItems(arr);
        store.setOverlaySpinner(false);
        store.setMenuItemsLimit(store.menuItemsLimit + 24);
      });
  };

  return (
    <div className="menu-items-container">
      <div className="menu-items">
        {firstLoading
          ? [...new Array(store.menuItemsLimit)].map((_, index) => (
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
      {totalItems > store.menuItemsLimit && (
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
