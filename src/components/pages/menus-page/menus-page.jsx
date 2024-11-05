import { NavLink, useParams } from 'react-router-dom';
import MenuItems from '../../menu-items/menu-items';

import './menus-page.sass';

const MenusPage = () => {
  const { category } = useParams();
  window.scrollTo(0, 0);

  return (
    <div className="menus-page">
      <div className="menus-page_nav">
        <NavLink className={`${category ? '' : 'active'}`} to="/menus/all">
          All Menu
        </NavLink>
        <NavLink to="/menus/classic-cakes">Classic Cakes</NavLink>
        <NavLink to="/menus/cheesecakes">Cheesecakes</NavLink>
        <NavLink to="/menus/wedding-cakes">Wedding Cakes</NavLink>
        <NavLink to="/menus/mini-cakes">Mini Cakes</NavLink>
        <NavLink to="/menus/cupcakes">Cupcakes</NavLink>
        <NavLink to="/menus/cookies">Sugar Cookies</NavLink>
      </div>
      <MenuItems category={category || 'all'} />
    </div>
  );
};

export default MenusPage;
