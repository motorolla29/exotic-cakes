import { NavLink } from 'react-router-dom';
import CartIcon from '../../icons/Untitled.svg';
import './header.sass';

const Header = () => {
  return (
    <div className="header">
      <div className="header_logo">LOGO</div>
      <div className="header_right-side">
        <div className="header_right-side_navbar">
          <NavLink to={'/menus'}>Menus</NavLink>
          <NavLink to={'/about'}>About</NavLink>
          <NavLink to={'/location'}>Location</NavLink>
          <NavLink to={'/merch'}>Merch</NavLink>
          <NavLink to={'/something-else'}>Something Else</NavLink>
        </div>
        <div className="header_right-side_cart-icon">
          <CartIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
