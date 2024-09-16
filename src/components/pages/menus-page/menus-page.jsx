import { NavLink, useParams } from 'react-router-dom';
import './menus-page.sass';
import MenuItems from '../../menu-items/menu-items';

const MenusPage = () => {
  const { category } = useParams();

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
