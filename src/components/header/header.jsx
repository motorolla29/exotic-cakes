import { NavLink, Link } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import { observer } from 'mobx-react-lite';
import store from '../../store/store';

import useWindowSize from '../../hooks/use-window-size';
import CartIcon from '../../icons/cart-icon.svg';

import './header.sass';

const Header = observer(() => {
  const [ww] = useWindowSize();
  const onHeaderLinksClick = () => {
    store.hamburgerMenu ? store.toggleHamburgerMenu(false) : null;
  };
  const getHamburgerIconSize = (width) => {
    if (width > 480) return 30;
    if (width <= 480 && width > 360) return 26;
    if (width <= 360) return 24;
    return 32;
  };

  return (
    <div className="header">
      {ww <= 1024 ? (
        <Hamburger
          toggled={store.hamburgerMenu}
          toggle={() => store.toggleHamburgerMenu(!store.hamburgerMenu)}
          size={getHamburgerIconSize(ww)}
          color="#551A8B"
          rounded
        />
      ) : null}
      <Link to="/" onClick={onHeaderLinksClick} className="header_logo">
        <img src="/images/EC-logo-fullsize-optimized.webp" alt="logo" />
      </Link>
      <div className="header_right-side">
        {ww > 1024 ? (
          <div className="header_right-side_navbar">
            <div className="header_right-side_navbar_link">
              <div className="header_right-side_navbar_link">
                <NavLink onClick={onHeaderLinksClick} to={'/'}>
                  Home
                </NavLink>
              </div>
              <NavLink onClick={onHeaderLinksClick} to={'/menus'}>
                Menus
              </NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink onClick={onHeaderLinksClick} to={'/about'}>
                About
              </NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink onClick={onHeaderLinksClick} to={'/location'}>
                Location
              </NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink onClick={onHeaderLinksClick} to={'/merch'}>
                Merch
              </NavLink>
            </div>
          </div>
        ) : null}
        <Link to="/cart" className="header_right-side_cart-icon">
          <CartIcon onClick={onHeaderLinksClick} />
          {store.cartItems.length ? (
            <div className="header_right-side_cart-icon_counter">
              <span>
                {store.cartItems.reduce((acc, it) => {
                  return acc + it.quantity;
                }, 0)}
              </span>
            </div>
          ) : null}
        </Link>
      </div>
    </div>
  );
});

export default Header;
