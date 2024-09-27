import './product-info.sass';

const ProductInfo = ({ item }) => {
  return (
    <div className="product-info">
      <div className="product-info_title">Exotic Cake number 801</div>
      <div className="product-info_price">400$</div>
      <div className="product-info_description">
        Limited Edition Exotic Cake including Vanilla, Red Velvet, Oreo, and
        Chocolate flavours. Available to order in Big (regular size) and Mini.
      </div>
      <div className="product-info_options-container">
        <div className="product-info_options-title">Size: Big Size</div>
        <div className="product-info_options">
          <div className="product-info_option">Big Size</div>
          <div className="product-info_option">Mini Size</div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
