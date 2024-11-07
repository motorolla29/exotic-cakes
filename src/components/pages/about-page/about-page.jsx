import { motion } from 'framer-motion';
import { blockAnimation, firstBlockAnimation } from '../../../animations';

import './about-page.sass';

const AboutPage = () => {
  window.scrollTo(0, 0);

  return (
    <div className="about-page">
      <motion.img
        initial="hidden"
        whileInView="visible"
        variants={firstBlockAnimation}
        viewport={{ once: true }}
        src="/images/Runway 2024-09-19T08_55_52.985Z Upscale Image Upscaled Image 3360 x 1920.jpg"
        className="about-page_top-image"
      />
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={blockAnimation}
        viewport={{ once: true }}
        className="about-page_heading-container"
      >
        <h1 className="about-page_heading-container_title">
          The Story of <span>Exotic</span> <span>Cakes</span>: A Legacy of
          Imagination and Craftsmanship
        </h1>
      </motion.div>

      <div className="about-page_history">
        <div className="about-page_history_block">
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
            src="/images/PhotoFunia-1726820039.jpg"
          ></motion.img>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
          >
            <h1>• 1875 - The Beginning</h1>
            <p>
              In a quaint European village, Exotic Cakes was founded by master
              baker Leopold Motorolla, a visionary who believed that cakes could
              be more than simple desserts—they could be works of art. Starting
              with intricate designs inspired by nature, his small bakery
              quickly gained a reputation for creating elaborate confections
              that pushed the boundaries of traditional cake-making.
            </p>
          </motion.div>
        </div>
        <div className="about-page_history_block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
          >
            <h1>• 1920 - The Revolution of Design</h1>
            <p>
              By the 1920s, the Motorolla family had expanded their business,
              moving to a bustling city where they began experimenting with
              avant-garde cake designs. Under the leadership of Leopold’s
              daughter, Clara, Exotic Cakes became known for its daring approach
              to baking—producing cupcakes shaped like mythical creatures and
              towering wedding cakes resembling castles and forests. Clara
              introduced the idea that cakes could be theatrical, full of
              imagination and storytelling.
            </p>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
            src="/images/photo_of_a_confectionery_shop_with_the_name_exotic_cakes_in_black_and_white_style_of_the_19th_centu_ldgxyyr83kh73bt2b3jb_2.png"
          ></motion.img>
        </div>
        <div className="about-page_history_block">
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
            src="/images/EC1920.jpg"
          ></motion.img>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
          >
            <h1>• 1978 - The Era of Pop Culture</h1>
            <p>
              In the late 20th century, Exotic Cakes embraced modern influences,
              crafting edible replicas of pop culture icons and movie
              characters. Now led by Clara’s grandson, Henry Motorolla, the
              bakery became a global sensation, creating cakes that mirrored the
              world of cinema, fashion, and fantasy. Their famous cartoon-themed
              cupcakes captured the hearts of children and adults alike,
              bringing a new wave of creativity to the baking world.
            </p>
          </motion.div>
        </div>
        <div className="about-page_history_block">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
          >
            <h1>• 2024 - A New Chapter</h1>
            <p>
              Today, Exotic Cakes continues to innovate under the leadership of
              Henry’s great-granddaughter, Sophie Motorolla. The bakery
              specializes in larger-than-life cakes, including wedding cakes
              sculpted like tropical palm trees or futuristic cities. With a
              global following and a creative team of artists, Exotic Cakes is
              celebrated for blending tradition with bold, modern designs,
              continuing a legacy of wonder that started nearly 150 years ago.
            </p>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            variants={blockAnimation}
            viewport={{ once: true }}
            src="/images/confectionery_shop_with_the_name_exotic_cakes_name_of_the_shop_is_handwritten_yellow_cursive_script_nentejkycuprbmg2fo5v_1.png"
          ></motion.img>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
