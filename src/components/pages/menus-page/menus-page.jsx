import { NavLink, Outlet } from 'react-router-dom';
import './menus-page.sass';

const MenusPage = () => {
  return (
    <div className="menus-page">
      <div className="menu">
        <div className="menu_nav">
          <NavLink to="all">All Menu</NavLink>
          <NavLink to="classic-cakes">Classic Cakes</NavLink>
          <NavLink to="cheesecakes">Cheesecakes</NavLink>
          <NavLink to="wedding-cakes">Wedding Cakes</NavLink>
          <NavLink to="mini-cakes">Mini Cakes</NavLink>
          <NavLink to="cupcakes">Cupcakes</NavLink>
          <NavLink to="cookies">Sugar Cookies</NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MenusPage;
