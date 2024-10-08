import { useEffect, useState } from 'react';
import MenuItem from '../menu-item/menu-item';
import MenuItemSkeleton from '../menu-item-skeleton/menu-item-skeleton';
import OverlayLogoSpinner from '../overlay-logo-spinner/overlay-logo-spinner';

import './menu-items.sass';

const MenuItems = ({ category }) => {
  const [items, setItems] = useState([]);
  const [firstLoading, setFirstLoading] = useState(false);
  const [overlayLoading, setIsOverlayLoading] = useState(false);
  const [limit, setLimit] = useState(24);
  const [itemsTotal, setItemsTotal] = useState(0);

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
        setItemsTotal(arr.length);
        setLimit(24);
        arr.length > 24 ? (arr.length = 24) : null;
        setItems(arr);
        setFirstLoading(false);
      });
  }, [category]);

  const onSeeMoreButtonClickHandler = () => {
    setIsOverlayLoading(true);
    fetch(
      `https://66e43448d2405277ed137dfc.mockapi.io/items${
        category === 'all' ? '' : `?category=${category}`
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItemsTotal(arr.length);
        limit > itemsTotal
          ? (arr.length = itemsTotal)
          : (arr.length = limit + 24);
        setItems(arr);
        itemsTotal > limit ? setLimit(limit + 24) : null;
        setIsOverlayLoading(false);
        console.log(arr.length);
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
      {itemsTotal > limit ? (
        <button
          onClick={onSeeMoreButtonClickHandler}
          className="see-more-button"
        >
          SEE MORE
        </button>
      ) : null}
      {overlayLoading && <OverlayLogoSpinner loading />}
    </div>
  );
};

export default MenuItems;
