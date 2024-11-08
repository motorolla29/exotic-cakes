import ContentLoader from 'react-content-loader';

import './skeletons.sass';

const ProductInfoSkeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 400 458"
    backgroundColor="#f3f3f3"
    foregroundColor="#c5b7ff3e"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="60%" height="30" />
    <rect x="0" y="50" rx="5" ry="5" width="35" height="25" />
    <rect x="0" y="90" rx="0" ry="0" width="100%" height="1" />
    <rect x="0" y="106" rx="5" ry="5" width="90%" height="30" />
    <rect x="0" y="151" rx="5" ry="5" width="20%" height="15" />
    <rect x="0" y="176" rx="10" ry="10" width="70" height="40" />
    <rect x="80" y="176" rx="10" ry="10" width="70" height="40" />
    <rect x="0" y="226" rx="5" ry="5" width="25%" height="15" />
    <rect x="0" y="251" rx="10" ry="10" width="120" height="30" />
    <rect x="130" y="251" rx="10" ry="10" width="90" height="30" />
    <rect x="230" y="251" rx="10" ry="10" width="90" height="30" />

    <rect x="0" y="291" rx="0" ry="0" width="100%" height="1" />
    <rect x="0" y="302" rx="5" ry="5" width="70%" height="15" />
    <rect x="0" y="327" rx="5" ry="5" width="20" height="20" />
    <rect x="30" y="327" rx="5" ry="5" width="25" height="20" />
    <rect x="0" y="352" rx="5" ry="5" width="20" height="20" />
    <rect x="30" y="352" rx="5" ry="5" width="30" height="20" />
    <rect x="0" y="387" rx="0" ry="0" width="100%" height="1" />
    <rect x="30%" y="408" rx="20" ry="20" width="40%" height="40" />
  </ContentLoader>
);

export default ProductInfoSkeleton;
