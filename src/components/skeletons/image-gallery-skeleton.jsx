import ContentLoader from 'react-content-loader';
import useWindowSize from '../../hooks/use-window-size';

import './skeletons.sass';

const ImageGallerySkeleton = (props) => {
  const [ww] = useWindowSize();
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 400 452"
      backgroundColor="#f3f3f3"
      foregroundColor="#c5b7ff3e"
      {...props}
    >
      <rect x="0" y="0" rx="5" ry="5" width="400" height="400" />
      {ww < 768 ? (
        <>
          <circle cx="45%" cy="415" r="4" />
          <circle cx="48.333%" cy="415" r="4" />
          <circle cx="51.666%" cy="415" r="4" />
          <circle cx="55%" cy="415" r="4" />
          <rect x="0" y="430" rx="0" ry="0" width="100%" height="1" />
        </>
      ) : (
        <>
          <rect x="0" y="405" rx="5" ry="5" width="47" height="47" />
          <rect x="52" y="405" rx="5" ry="5" width="47" height="47" />
          <rect x="104" y="405" rx="5" ry="5" width="47" height="47" />
          <rect x="156" y="405" rx="5" ry="5" width="47" height="47" />
        </>
      )}
    </ContentLoader>
  );
};
export default ImageGallerySkeleton;
