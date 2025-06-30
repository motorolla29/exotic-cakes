import ContentLoader from 'react-content-loader';

import './skeletons.sass';

const MenuItemSkeleton = (props) => (
  <ContentLoader
    className="menu-item-skeleton"
    speed={1}
    viewBox="0 0 400 520"
    backgroundColor="#f3f3f3"
    foregroundColor="#c5b7ff3e"
    {...props}
  >
    <rect x="0" y="0" rx="20" ry="20" width="100%" height="360" />
    <circle cx="40%" cy="380" r="7" />
    <circle cx="46.666%" cy="380" r="7" />
    <circle cx="53.333%" cy="380" r="7" />
    <circle cx="60%" cy="380" r="7" />
    <rect x="0" y="400" rx="20" ry="20" width="100%" height="50" />
    <rect x="30%" y="470" rx="20" ry="20" width="40%" height="50" />
  </ContentLoader>
);

export default MenuItemSkeleton;
