import menu from '../../mocks/menu';
import MenuItem from '../menu-item/menu-item';

import './menu-items.sass';

const MenuItems = ({ category }) => {
  return (
    <div className="menu-items">
      {menu[category || 'all'].map((it) => (
        <MenuItem key={it.id} id={it.id} title={it.title} price={it.price} />
      ))}
    </div>
  );
};

export default MenuItems;
