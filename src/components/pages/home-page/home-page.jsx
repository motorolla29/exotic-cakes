import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

import LogoSpinner from '../../logo-spinner/logo-spinner';
import PlayIcon from '../../../icons/play.svg';
import PauseIcon from '../../../icons/pause.svg';
import { blockAnimation, firstBlockAnimation } from '../../../animations';

import './home-page.sass';

const HomePage = () => {
  const [videoPlaying, setVideoPlaying] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const MotionLink = motion(Link);

  return (
    <div className="home-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={firstBlockAnimation}
        viewport={{ once: true }}
        className="player-wrapper"
      >
        <ReactPlayer
          className="react-player"
          url="/video/main video bit2.mp4"
          width="100%"
          height="100%"
          playing={videoPlaying}
          loop={true}
          muted={true}
          fallback={
            <div style={{ height: '100vh' }}>
              <LogoSpinner />
            </div>
          }
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
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockAnimation}
        viewport={{ once: true }}
        className="meet-chef-promo"
      >
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
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockAnimation}
        viewport={{ once: true }}
        className="merch-promo-wrapper"
      >
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
      </motion.div>
      <div className="categories-links">
        <MotionLink
          initial="hidden"
          whileInView="visible"
          variants={blockAnimation}
          viewport={{ once: true }}
          to="/menus/cheesecakes"
        >
          Cheesecakes
        </MotionLink>
        <MotionLink
          initial="hidden"
          whileInView="visible"
          variants={blockAnimation}
          viewport={{ once: true }}
          to="/menus/wedding-cakes"
        >
          Wedding Cakes
        </MotionLink>
        <MotionLink
          initial="hidden"
          whileInView="visible"
          variants={blockAnimation}
          viewport={{ once: true }}
          to="/menus/cupcakes"
        >
          Cupcakes
        </MotionLink>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockAnimation}
        viewport={{ once: true }}
      >
        <Link to="/location" className="promo-location">
          <div className="promo-location"></div>
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
