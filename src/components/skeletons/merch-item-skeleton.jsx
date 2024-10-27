import ContentLoader from 'react-content-loader';
import useWindowSize from '../../hooks/use-window-size';
import './skeletons.sass';

const MerchItemSkeleton = (props) => {
  const [ww] = useWindowSize();
  return (
    <ContentLoader
      speed={1.5}
      //viewBox="0 0 430 450"
      viewBox={`0 0 430 ${ww > 480 ? 450 : 580}`}
      backgroundColor="#e6e0ff"
      foregroundColor="#ece7ff"
      {...props}
    >
      {/* <rect x="0" y="0" rx="20" ry="20" width="430" height="340" />
      <rect x="20%" y="350" rx="20" ry="20" width="60%" height="40" />
      <rect x="40%" y="400" rx="20" ry="20" width="20%" height="40" /> */}
      <rect
        x="0"
        y="0"
        rx="20"
        ry="20"
        width="430"
        height={`${ww > 480 ? 340 : 470}`}
      />
      <rect
        x="20%"
        y={`${ww > 480 ? 350 : 480}`}
        rx="20"
        ry="20"
        width="60%"
        height="40"
      />
      <rect
        x="40%"
        y={`${ww > 480 ? 400 : 530}`}
        rx="20"
        ry="20"
        width="20%"
        height="40"
      />
    </ContentLoader>
  );
};

export default MerchItemSkeleton;
