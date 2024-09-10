import { NavLink, Link } from 'react-router-dom';
import CartIcon from '../../icons/cart-icon.svg';
import './header.sass';

const Header = () => {
  return (
    <div className="header">
      <div className="header_logo">LOGO</div>
      <div className="header_right-side">
        <div className="header_right-side_navbar">
          <div className="header_right-side_navbar_link">
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
          <div className="header_right-side_navbar_link">
            <NavLink to={'/something-else'}>Something Else</NavLink>
          </div>
        </div>
        <Link to="/cart" className="header_right-side_cart-icon">
          <CartIcon />
          <div className="header_right-side_cart-icon_counter">
            <span>0</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
