import './about-page.sass';

const AboutPage = () => {
  return (
    <div className="about-page">
      <img
        src="/images/Runway 2024-09-19T08_55_52.985Z Upscale Image Upscaled Image 3360 x 1920.jpg"
        className="about-page_top-image"
      />
      <div className="about-page_heading-container">
        <h1 className="about-page_heading-container_title">
          The Story of <span>Exotic</span> <span>Cakes</span>: A Legacy of
          Imagination and Craftsmanship
        </h1>
      </div>
      <div className="about-page_history">
        <div className="about-page_history_block">
          <img src="/images/PhotoFunia-1726820039.jpg"></img>
          <div></div>
        </div>
        <div className="about-page_history_block">
          <div></div>
          <img src="/images/photo_of_a_confectionery_shop_with_the_name_exotic_cakes_in_black_and_white_style_of_the_19th_centu_ldgxyyr83kh73bt2b3jb_2.png"></img>
        </div>
        <div className="about-page_history_block">
          <img src="/images/EC1920.jpg"></img>
          <div></div>
        </div>
        <div className="about-page_history_block">
          <div></div>
          <img src="/images/confectionery_shop_with_the_name_exotic_cakes_name_of_the_shop_is_handwritten_yellow_cursive_script_nentejkycuprbmg2fo5v_1.png"></img>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
