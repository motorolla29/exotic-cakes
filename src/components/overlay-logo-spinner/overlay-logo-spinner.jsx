import { useEffect } from 'react';
import { ImpulseSpinner } from 'react-spinners-kit';
import CakeLogo from '../../icons/cake-svg.svg';
import { customScrollController } from '../../utils';

import './overlay-logo-spinner.sass';

const OverlayLogoSpinner = () => {
  useEffect(() => {
    customScrollController.disableScrollWithRetention();
    return () => customScrollController.enableScrollWithRetention();
  });

  return (
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
  );
};

export default OverlayLogoSpinner;
