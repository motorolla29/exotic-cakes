import ContentLoader from 'react-content-loader';

import './skeletons.sass';

const ProductInfoSkeleton = (props) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 400 547"
    backgroundColor="#f3f3f3"
    foregroundColor="#c5b7ff3e"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="60%" height="30" />
    <rect x="0" y="50" rx="5" ry="5" width="10%" height="30" />
    <rect x="0" y="100" rx="0" ry="0" width="100%" height="1" />
    <rect x="0" y="121" rx="5" ry="5" width="90%" height="50" />
    <rect x="0" y="190" rx="5" ry="5" width="25%" height="20" />
    <rect x="0" y="230" rx="10" ry="10" width="20%" height="40" />
    <rect x="25%" y="230" rx="10" ry="10" width="20%" height="40" />
    <rect x="0" y="290" rx="5" ry="5" width="40%" height="20" />
    <rect x="0" y="330" rx="10" ry="10" width="35%" height="30" />
    <rect x="40%" y="330" rx="10" ry="10" width="25%" height="30" />
    <rect x="70%" y="330" rx="10" ry="10" width="25%" height="30" />

    <rect x="0" y="375" rx="0" ry="0" width="100%" height="1" />
    <rect x="0" y="391" rx="5" ry="5" width="70%" height="20" />
    <rect x="0" y="426" rx="5" ry="5" width="20" height="20" />
    <rect x="30" y="426" rx="5" ry="5" width="25" height="20" />
    <rect x="0" y="456" rx="5" ry="5" width="20" height="20" />
    <rect x="30" y="456" rx="5" ry="5" width="40" height="20" />
    <rect x="0" y="491" rx="0" ry="0" width="100%" height="1" />
    <rect x="30%" y="507" rx="20" ry="20" width="40%" height="40" />
  </ContentLoader>
);

export default ProductInfoSkeleton;
