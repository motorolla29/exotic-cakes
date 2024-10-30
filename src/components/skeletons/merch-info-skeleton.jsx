import ContentLoader from 'react-content-loader';

import './skeletons.sass';

const MerchInfoSkeleton = (props) => (
  <ContentLoader
    speed={1.5}
    viewBox="0 0 400 220"
    backgroundColor="#e6e0ff"
    foregroundColor="#ece7ff"
    {...props}
  >
    <rect x="12" y="10" rx="5" ry="5" width="70%" height="30" />
    <rect x="12" y="50" rx="5" ry="5" width="40" height="25" />
    <rect x="12" y="85" rx="5" ry="5" width="100" height="20" />
    <rect x="12" y="115" rx="5" ry="5" width="10%" height="25" />
    <rect x="15%" y="115" rx="5" ry="5" width="10%" height="25" />
    <rect x="27.5%" y="115" rx="5" ry="5" width="10%" height="25" />
    <rect x="40%" y="115" rx="5" ry="5" width="10%" height="25" />
    <rect x="30%" y="170" rx="20" ry="20" width="40%" height="40" />
  </ContentLoader>
);

export default MerchInfoSkeleton;
