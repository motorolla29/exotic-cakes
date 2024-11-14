import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment/moment';

import LocationPageMap from '../../location-page-map/location-page-map';
import { blockAnimation, firstBlockAnimation } from '../../../animations';
import BlurhashImage from '../../blurhash-image/blurhash-image';

import './location-page.sass';

const LocationPage = () => {
  window.scrollTo(0, 0);

  return (
    <div className="location-page">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={firstBlockAnimation}
        viewport={{ once: true }}
        className="store"
      >
        <div className="store_img">
          <BlurhashImage
            src="/images/exotic_cakes_is_a_confectionery_shop_with_a_handwritten_italics_logo_the_photo_was_taken_from_outsi_qv9rzco5s1wcp2rf3vhq_1.png"
            hash="UAF5]SNy4TD%00?GIAM|~UMytlkAD*o}-:s;"
            transitionDuration={0.75}
          />
        </div>
        <div className="store_info">
          <p>EXOTIC CAKES - A PLACE WHERE IMAGINATION MEETS BAKING</p>
          <p>
            At Exotic Cakes, we turn your wildest ideas into delicious
            realities! Our cakes are crafted fresh every day right here in the
            bakery, with designs that push the boundaries of creativity. Whether
            it's a cake shaped like a palm tree, a car, a cozy cottage, or even
            a boat, if you can dream it, we can bake it.
          </p>
          <p>
            Visit us to explore our incredible selection of custom cakes,
            cupcakes, and other baked goodies. We’re open all week, ready to
            make your celebration truly unique.
          </p>
          <p>
            Find us tucked away on the corner of Dream Street and Sweet Avenue.
          </p>
          <div className="store_info_address">
            <p>10 DREAM STREET</p>
            <p>LONDON</p>
          </div>
          <div className="store_info_hours">
            <p>MON-SAT: 11am-7pm</p>
            <p>SUN: 12pm-6pm</p>
          </div>
        </div>
      </motion.div>
      <div className="menu">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={blockAnimation}
          viewport={{ once: true }}
          className="menu_img"
        >
          <BlurhashImage
            src="/images/confectionery_with_the_exotic_cakes__the_photo_was_taken_from_outside_where_the_sign_logo_written_i_bkvxqywrpc3muqkb1bvo_3.png"
            hash="UIF5dBT}En~TOq={-oS~-?x]kW$+JCxakVa#"
            transitionDuration={0.75}
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={blockAnimation}
          viewport={{ once: true }}
          className="menu_info"
        >
          <p className="menu_info_title">THIS WEEK'S MENU AT EXOTIC CAKES</p>
          <p className="menu_info_date">
            W/C {moment().day(1).format('Do MMMM')}
          </p>
          <div className="menu_info_items">
            <div className="menu_info_item">
              <p>TROPICAL SUNSET CAKE</p>
              <span>
                A layered cake with pineapple, coconut, and passionfruit
                flavors, designed like a tropical island.
              </span>
            </div>
            <div className="menu_info_item">
              <p>CHOCOLATE RACE CAR</p>
              <span>
                A rich chocolate cake shaped like a race car, with smooth
                ganache and edible metallic details.
              </span>
            </div>
            <div className="menu_info_item">
              <p>MANGO COCONUT BOAT CUPCAKE</p>
              <span>
                Fluffy coconut cupcake with mango cream, shaped like a mini
                boat.
              </span>
            </div>
            <div className="menu_info_item">
              <p>LAVENDER DREAM COTTAGE CUPCAKE</p>
              <span>
                A vanilla cupcake infused with lavender, designed to look like a
                charming cottage.
              </span>
            </div>
            <div className="menu_info_item">
              <p>CARAMELIZED APPLE PALM TREE CAKE</p>
              <span>
                Moist apple spice cake with caramelized apple slices, designed
                as a palm tree.
              </span>
            </div>
            <div className="menu_info_item">
              <p>STRAWBERRY CHEESECAKE CABIN</p>
              <span>
                Cheesecake layers with fresh strawberries, built to resemble a
                cozy cabin.
              </span>
            </div>
            <div className="menu_info_item">
              <p>DOUBLE CHOCOLATE SAFARI ANIMAL COOKIES</p>
              <span>
                Soft, chocolate-packed cookies shaped like safari animals.
              </span>
            </div>
            <div className="menu_info_item">
              <p>PLANT-BASED LEMON ZEST CUPCAKE</p>
              <span>Bright, zesty lemon cupcake with vegan buttercream.</span>
            </div>
            <div className="menu_info_item">
              <p>RASPBERRY & ALMOND WINDMILL CUPCAKE</p>
              <span>
                Almond cupcake with raspberry filling, decorated like a
                whimsical windmill.
              </span>
            </div>
            <div className="menu_info_item">
              <p>COCONUT & MATCHA TEMPLE</p>
              <span>
                A coconut and matcha cake, intricately shaped like a
                pagoda-style temple.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockAnimation}
        viewport={{ once: true }}
        className="location-page-map"
      >
        <LocationPageMap />
        <Link
          target="_blank"
          to="https://maps.google.com?saddr=Current+Location&daddr=51.508386,-0.126229"
          className="get-directions-link"
        >
          GET DIRECTIONS
        </Link>
      </motion.div>
    </div>
  );
};

export default LocationPage;
