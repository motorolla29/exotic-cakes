import ECLogoCake from '../../icons/cake-svg.svg';
import { StageSpinner } from 'react-spinners-kit';

import './logo-spinner.sass';

const LogoSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <ECLogoCake />
        <StageSpinner loading color="#C5B7FF" size={5} sizeUnit="em" />
      </div>
    </div>
  );
};

export default LogoSpinner;
