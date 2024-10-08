import { useEffect } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

import { ImpulseSpinner } from 'react-spinners-kit';
import CakeLogo from '../../icons/cake-svg.svg';

import './overlay-logo-spinner.sass';

const OverlayLogoSpinner = ({ loading }) => {
  useEffect(() => {
    if (loading) {
      disablePageScroll();
    } else {
      enablePageScroll();
    }
    return () => enablePageScroll();
  }, [loading]);

  return (
    loading && (
      <div className="overlay-logo-spinner_shadow">
        <div className="overlay-logo-spinner">
          <CakeLogo className="overlay-logo-spinner_svg" />
          <ImpulseSpinner
            className="overlay-logo-spinner_loader"
            frontColor="#ae9cf6"
            backColor="#C5B7FF"
            size={6}
            sizeUnit="em"
          />
        </div>
      </div>
    )
  );
};

export default OverlayLogoSpinner;
