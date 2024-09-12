import { useParams } from 'react-router-dom';

import './menu-items.sass';

const MenuItems = () => {
  const { category } = useParams();
  return <div className="menu_items">{category}</div>;
};

export default MenuItems;
