import { NavLink, Link } from 'react-router-dom';
import { Squash as Hamburger } from 'hamburger-react';
import { observer } from 'mobx-react-lite';
import store from '../store/store';

import useWindowSize from '../../hooks/use-window-size';
import CartIcon from '../../icons/cart-icon.svg';

import './header.sass';

const Header = observer(() => {
  const [ww] = useWindowSize();
  return (
    <div className="header">
      {ww <= 1024 ? (
        <Hamburger
          toggled={store.hamburgerMenu}
          toggle={() => store.toggleHamburgerMenu(!store.hamburgerMenu)}
          size={ww > 480 ? 30 : 26}
          color="#551A8B"
          rounded
        />
      ) : null}
      <Link to="/" className="header_logo">
        <img src="/images/EC-logo-8bit.png" alt="logo" />
      </Link>
      <div className="header_right-side">
        {ww > 1024 ? (
          <div className="header_right-side_navbar">
            <div className="header_right-side_navbar_link">
              <div className="header_right-side_navbar_link">
                <NavLink to={'/'}>Home</NavLink>
              </div>
              <NavLink to={'/menus'}>Menus</NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink to={'/about'}>About</NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink to={'/location'}>Location</NavLink>
            </div>
            <div className="header_right-side_navbar_link">
              <NavLink to={'/merch'}>Merch</NavLink>
            </div>
          </div>
        ) : null}
        <Link to="/cart" className="header_right-side_cart-icon">
          <CartIcon
            onClick={() =>
              store.hamburgerMenu ? store.toggleHamburgerMenu(false) : null
            }
          />
          {store.cartItems.length ? (
            <div className="header_right-side_cart-icon_counter">
              <span>{store.cartItems.length}</span>
            </div>
          ) : null}
        </Link>
      </div>
    </div>
  );
});

export default Header;
