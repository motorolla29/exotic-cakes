import ContentLoader from 'react-content-loader';
import useWindowSize from '../../hooks/use-window-size';
import './skeletons.sass';

const MerchItemSkeleton = (props) => {
  const [ww] = useWindowSize();
  return (
    <ContentLoader
      speed={1.5}
      viewBox={`0 0 430 ${ww > 480 ? 410 : 550}`}
      backgroundColor="#e6e0ff"
      foregroundColor="#ece7ff"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx="20"
        ry="20"
        width="430"
        height={`${ww > 480 ? 320 : 420}`}
      />
      <rect
        x="20%"
        y={`${ww > 480 ? 330 : 435}`}
        rx={`${ww > 480 ? 10 : 15}`}
        ry={`${ww > 480 ? 10 : 15}`}
        width="60%"
        height={`${ww > 480 ? 25 : 35}`}
      />
      <rect
        x="42.5%"
        y={`${ww > 480 ? 365 : 485}`}
        rx={`${ww > 480 ? 10 : 15}`}
        ry={`${ww > 480 ? 10 : 15}`}
        width="15%"
        height={`${ww > 480 ? 25 : 35}`}
      />
    </ContentLoader>
  );
};

export default MerchItemSkeleton;
