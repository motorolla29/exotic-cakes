import { NavLink, Link } from 'react-router-dom';
import CartIcon from '../../icons/cart-icon.svg';
import './header.sass';
import { useEffect, useState } from 'react';

const Header = () => {
  const [scroll, setScroll] = useState(null);
  const onScrollHandler = (e) => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
  });
  return (
    <div className="header-container">
      <div className="header">
        <Link className="header_logo">
          <img src="/images/EC-logo-8bit.png" alt="logo" />
        </Link>
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
      <svg
        className={`header-drip ${scroll === 0 ? 'shown' : 'hidden'}`}
        id="_Слой_1"
        data-name="Слой 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 808.45 181.22"
      >
        <path
          d="M0,0c.45.26,117.63.09,176.45.26h632l-73,4-37,3-33,3-7.91,1.05c-4.72.63-9.4,1.56-14.01,2.79l-8.09,2.16s-17,5-20.44,15.32c-4.85,14.58,1.47,17.6,3.05,43.52,1.6,25.6-19.9,34.8-25.8,8.3-4.83-21.68,15.45-37.57,7.49-50.5-2.13-3.46-6.14-6.4-10.3-6.65-6.88-.42-12.32,6.64-13.78,8.55-16.81,21.83,7.92,58.55-1.8,93.4-4.8,17.2-27.5,17.7-23.8-19.4,4.6-46.6,9.9-60.6-.9-60.8-28.7-.7-10.8,12.8-13,52.6-1.6,29.4-34.5,22-22.1-17,4.7-14.7,5.2-18.7,4.1-24.1-1.1-5.4-7.7-9.7-13.1-7.1-5.4,2.6-10.6-1.5-12.4-5-3.7-7-31.4-16.1-33.1,11.1-1.2,20.8,3.3,48.6,4.7,59.6,1.6,12.2-4.5,28.4-17,27.3-28.6-2.4-4.2-54-5.2-93.5-.2-10-9.9-12.9-16.8,2.5-2,4.5-3.6,11.7-8.9,12.1-10.6.8-10.1-22.7-19.3-26.5-4.3-1.8-7.9-1.3-10.9,2.3-37.3,44.5,1.8,72-20,96.6-8.8,10-21.1-1.6-21.5-13.7-.8-23.1,11.9-56.5-.9-61.2-19.1-6.9-24.4,15.7-22,35.9,6,48.8,14.4,77-3.7,80.6-7.48,1.47-12.65.61-16.12-2.09-12.52-9.74,19.98-60.76,2.82-106.21-6.65-17.61-21.19-34.89-31.32-32.95-11.64,2.23-22.01,30.72-19.68,55.35,1.36,14.37,6.53,26.59-.2,38.5-7,12.4-20.9,9.2-25.7-.9-5.1-10.7-.1-30.5,3.3-45.5,8.2-36.17,2.46-43.76-1.27-47.06-2.86-2.53-8.22-4.65-12.44-3.38-20,6,4.09,40-12.18,55.75-3.94,3.81-7.27,3.33-7.82,3.25-6.86-.96-12.85-8.02-11-21,2-14,6.63-26.65,5-36-.92-5.27-4-9-9.99-13.16-8.14-5.65-17.01-7.84-28.01-9.84l-26-3-27-3S-.45-.25,0,0Z"
          fill="#ffaed7"
          stroke-width="0"
        />
      </svg>
    </div>
  );
};

export default Header;
