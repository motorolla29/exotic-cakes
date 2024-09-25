import { Link } from 'react-router-dom';

import {
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialYoutube,
} from 'react-icons/sl';

import './footer.sass';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_first-floor">
        <div className="footer_first-floor_social">
          <div className="footer_first-floor_social_icon-container">
            <SlSocialFacebook />
          </div>
          <div className="footer_first-floor_social_icon-container">
            <SlSocialTwitter />
          </div>
          <div className="footer_first-floor_social_icon-container">
            <SlSocialInstagram />
          </div>
          <div className="footer_first-floor_social_icon-container">
            <SlSocialYoutube />
          </div>
        </div>
        <div className="footer_first-floor_right-side"></div>
      </div>
      <div className="footer_second-floor">
        <Link target="_blank" to="https://github.com/motorolla29">
          Powered by Motorolla29 © 2024
        </Link>
      </div>
    </div>
  );
};

export default Footer;
