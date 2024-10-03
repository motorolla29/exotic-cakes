import menu from '../../mocks/menu.json';
import MenuItem from '../menu-item/menu-item';

import './menu-items.sass';

const MenuItems = ({ category }) => {
  console.log(menu);
  return (
    <div className="menu-items">
      {menu.map((it) => (
        <MenuItem
          key={it.id}
          category={category}
          id={it.id}
          title={it.title}
          price={it.price}
        />
      ))}
    </div>
  );
};

export default MenuItems;
