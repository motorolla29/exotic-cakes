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
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const location = useLocation();
  const limit = 24;

  useEffect(() => {
    setItems([]);
    setPage(1);
    setTotalItems(0);
  }, [category, location.pathname]);

  useEffect(() => {
    async function fetchItems() {
      if (page === 1) setInitialLoading(true);
      else setLoadingMore(true);

      try {
        const res = await fetch(
          `/api/items?category=${encodeURIComponent(
            category
          )}&page=${page}&limit=${limit}`
        );
        const { items: newItems, totalCount } = await res.json();
        setTotalItems(totalCount);
        setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
      } catch (err) {
        console.error('Failed to fetch items:', err);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    }

    fetchItems();
  }, [category, page, location.pathname]);

  const handleSeeMore = () => {
    if (items.length < totalItems) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="menu-items-container">
      <div className="menu-items">
        {initialLoading
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
      {items.length < totalItems && (
        <button onClick={handleSeeMore} className="see-more-button">
          SEE MORE
        </button>
      )}
      {loadingMore && <OverlayLogoSpinner />}
    </div>
  );
});

export default MenuItems;
