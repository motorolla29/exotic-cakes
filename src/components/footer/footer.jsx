import { Link } from 'react-router-dom';

import {
  SlSocialFacebook,
  SlSocialTwitter,
  SlSocialInstagram,
  SlSocialYoutube,
} from 'react-icons/sl';
import {
  Amex,
  Applepay,
  DinersClub,
  Discover,
  Googlepay,
  Mastercard,
  Paypal,
  Visa,
} from 'react-pay-icons';
import CakeLogo from '../../icons/cake-contour-svg.svg';
import './footer.sass';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_top">
        <div className="footer_top_first">
          <CakeLogo />
          <h3>CAKE BEYOND IMAGINATION ®</h3>
          <p>HANDCRAFTED & DESIGNED BY</p>
          <p>EXOTIC CAKES BAKERY, LLC</p>
          <p>© 2025 EXOTIC CAKES</p>
        </div>
        <div className="footer_top_second">
          <h3>QUICK LINKS</h3>
          <Link to="/about">About</Link>
          <Link to="/location">Contact Us</Link>
          <p>FAQ'S</p>
          <p>Shipping Info</p>
          <p>Terms and Conditions</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer_top_third">
          <div className="footer_top_third_social">
            <h3>SOCIAL LINKS</h3>
            <div className="footer_top_third_social_link">
              <div className="footer_top_third_social_link_icon-container facebook">
                <SlSocialFacebook />
              </div>
              <span>Facebook</span>
            </div>
            <div className="footer_top_third_social_link">
              <div className="footer_top_third_social_link_icon-container twitter">
                <SlSocialTwitter />
              </div>
              <span>Twitter</span>
            </div>
            <div className="footer_top_third_social_link">
              <div className="footer_top_third_social_link_icon-container instagram">
                <SlSocialInstagram />
              </div>
              <span>Instagram</span>
            </div>
            <div className="footer_top_third_social_link">
              <div className="footer_top_third_social_link_icon-container youtube">
                <SlSocialYoutube />
              </div>
              <span>Youtube</span>
            </div>
          </div>
          <div className="footer_top_third_pay-methods">
            <h3>WE ACCEPT</h3>
            <div className="footer_top_third_pay-methods_icons">
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Amex />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Visa />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Mastercard />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Applepay />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Googlepay />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <DinersClub />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Discover />
              </div>
              <div className="footer_top_third_pay-methods_icons_icon-container">
                <Paypal />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer_basement">
        <Link target="_blank" to="https://github.com/motorolla29">
          Powered by Motorolla29 © 2025
        </Link>
      </div>
    </div>
  );
};

export default Footer;
