import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MenuItemSkeleton from '../skeletons/menu-item-skeleton';

import store from '../../store/store';
import MenuItem from '../menu-item/menu-item';
import OverlayLogoSpinner from '../overlay-logo-spinner/overlay-logo-spinner';
import { TiWarning } from 'react-icons/ti';

import './menu-items.sass';

const MenuItems = observer(({ category }) => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [firstPageLoaded, setFirstPageLoaded] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const limit = 24;

  useEffect(() => {
    setItems([]);
    setPage(1);
    setTotalItems(0);
    setError(null);
    setInitialLoading(true);
    setLoadingMore(false);
    setFirstPageLoaded(false);
  }, [category, location.pathname]);

  useEffect(() => {
    async function fetchItems() {
      if (page === 1) {
        setFirstPageLoaded(false);
        setInitialLoading(true);
      }

      try {
        const res = await fetch(
          `/api/items?category=${encodeURIComponent(
            category
          )}&page=${page}&limit=${limit}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || `Error ${res.status}`);
        }

        // безопасная деструктуризация
        const newItems = Array.isArray(data.items) ? data.items : [];
        const count = typeof data.totalCount === 'number' ? data.totalCount : 0;

        setTotalItems(count);
        setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));
        if (page === 1) setFirstPageLoaded(true);
      } catch (err) {
        console.error('Failed to fetch items:', err);
        setError(err.message);
        if (page === 1) setFirstPageLoaded(true);
      } finally {
        setInitialLoading(false);
        setLoadingMore(false);
      }
    }

    fetchItems();
  }, [category, page, location.pathname]);

  const handleSeeMore = () => {
    if (items.length < totalItems) {
      setLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="menu-items-container">
      {error && (
        <div className="menu-items-container_error">
          <TiWarning />
          <p>Error loading products:</p>
          <p>{error}</p>
        </div>
      )}
      <div className="menu-items">
        {!firstPageLoaded
          ? [...new Array(store.menuItemsLimit)].map((_, index) => (
              <MenuItemSkeleton key={index} />
            ))
          : items.length > 0 &&
            items.map((it) => (
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
      {!initialLoading && items.length > 0 && items.length < totalItems && (
        <button onClick={handleSeeMore} className="see-more-button">
          SEE MORE
        </button>
      )}
      {loadingMore && <OverlayLogoSpinner />}
    </div>
  );
});

export default MenuItems;
