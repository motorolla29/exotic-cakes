import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import LogoSpinner from '../../logo-spinner/logo-spinner';
import PlayIcon from '../../../icons/play.svg';
import PauseIcon from '../../../icons/pause.svg';

import './home-page.sass';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);

  window.scrollTo(0, 0);

  return (
    <div className="home-page">
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url="/video/main video bit2.mp4"
          width="100%"
          height="100%"
          playing={videoPlaying}
          loop={true}
          muted={true}
          fallback={<LogoSpinner />}
        />
        {videoPlaying ? (
          <PauseIcon
            onClick={() => setVideoPlaying(false)}
            className="play-icon"
          />
        ) : (
          <PlayIcon
            onClick={() => setVideoPlaying(true)}
            className="play-icon"
          />
        )}
      </div>

      <div className="meet-chef-promo">
        <h1>Meet Chef Luca Moretti, the Master of Imagination and Taste</h1>
        <p>
          <span>Chef Luca Moretti</span> has a unique vision for the world of
          desserts. With every creation, he combines artistry with innovation,
          transforming cakes, cookies, and pastries into edible masterpieces.
          From a car-shaped birthday cake to Australia-shaped cheesecake, every
          Exotic Cakes design is crafted to surprise, delight, and make every
          occasion unforgettable. Join him on this delicious journey to explore
          flavors and forms that are as wild as your imagination.
        </p>
        <div className="meet-chef-promo_cover"></div>
      </div>
      <div className="merch-promo-wrapper">
        <div className="merch-promo">
          <img className="merch-promo_image" src="/images/merch-promo.png" />
          <div className="merch-promo_info">
            <p className="merch-promo_info_title">MEET OUR MERCH!</p>
            <p className="merch-promo_info_description">
              Introducing Exotic Cakes merchandise! Now you can celebrate your
              love for our one-of-a-kind, artistic cakes with exclusive branded
              apparel and accessories. From stylish T-shirts to unique tote
              bags, our merch is as bold and colorful as our signature
              confections. Show off your passion for extraordinary desserts and
              stand out with Exotic Cakes!
            </p>
            <Link className="merch-promo_info_link" to="/merch">
              Visit Shop
            </Link>
          </div>
        </div>
      </div>
      <div className="categories-links">
        <Link to="/menus/cheesecakes">Cheesecakes</Link>
        <Link to="/menus/wedding-cakes">Wedding Cakes</Link>
        <Link to="/menus/cupcakes">Cupcakes</Link>
      </div>
      <Link to="/location" className="promo-location">
        <div className="promo-location"></div>
      </Link>
    </div>
  );
};

export default HomePage;
