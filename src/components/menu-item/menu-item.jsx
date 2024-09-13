import './menu-item.sass';

const MenuItem = ({ id, title, price }) => {
  return (
    <div className="menu-item">
      <div className="menu-item_photo"></div>
      <div className="menu-item_info">
        <p>{title}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default MenuItem;
