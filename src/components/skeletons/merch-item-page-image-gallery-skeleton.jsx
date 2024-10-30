import ContentLoader from 'react-content-loader';
import useWindowSize from '../../hooks/use-window-size';

import './skeletons.sass';

const MerchItemPageImageGallerySkeleton = (props) => {
  const [ww] = useWindowSize();
  return (
    <ContentLoader
      speed={1.5}
      viewBox="0 0 600 740"
      backgroundColor="#e6e0ff"
      foregroundColor="#ece7ff"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx={ww > 768 ? 5 : 0}
        ry={ww > 768 ? 5 : 0}
        width="100%"
        height="600"
      />
      <rect
        x={ww > 768 ? '0' : '2%'}
        y="610"
        rx="5"
        ry="5"
        width={ww > 768 ? '10%' : '8%'}
        height="120"
      />
      <rect x="15%" y="610" rx="5" ry="5" width="20%" height="120" />
      <rect x="40%" y="610" rx="5" ry="5" width="20%" height="120" />
      <rect x="65%" y="610" rx="5" ry="5" width="20%" height="120" />
      <rect
        x="90%"
        y="610"
        rx="5"
        ry="5"
        width={ww > 768 ? '10%' : '8%'}
        height="120"
      />
    </ContentLoader>
  );
};

export default MerchItemPageImageGallerySkeleton;
