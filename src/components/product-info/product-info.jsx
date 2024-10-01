import { CiShoppingCart } from 'react-icons/ci';

import './product-info.sass';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LuCake } from 'react-icons/lu';
import { TbPencilHeart } from 'react-icons/tb';

const ProductInfo = ({ item }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const optionsName = item.options ? Object.entries(item.options)[0][0] : null;
  const options = item.options ? Object.entries(item.options)[0][1] : null;
  const spongeVariants = item.variants.Sponge;
  const fillVariants = item.variants['Filling Icing'];

  const [currentOption, setCurrentOption] = useState(
    item.options
      ? options.find((option) => option.name === searchParams.get('option')) ||
          options[0]
      : null
  );
  const [currentSpongeVariant, setCurrentSpongeVariant] = useState(
    spongeVariants.find((variant) => variant === searchParams.get('sponge')) ||
      spongeVariants[0]
  );
  const [currentFillVariant, setCurrentFillVariant] = useState(
    fillVariants.find((variant) => variant === searchParams.get('fill')) ||
      fillVariants[0]
  );

  const [cakeSignOption, setCakeSignOption] = useState(false);
  const [cardSignOption, setCardSignOption] = useState(false);
  const [cakeSignText, setCakeSignText] = useState('');
  const [cardSignText, setCardSignText] = useState('');

  return (
    <div className="product-info">
      <h1 className="product-info_title">{item.title}</h1>
      <div className="product-info_price">
        {currentOption ? currentOption.price : item.price}$
      </div>
      <div className="product-info_description">
        Limited Edition Exotic Cake including Vanilla, Red Velvet, Oreo, and
        Chocolate flavours. Available to order in Big (regular size) and Mini.
      </div>

      {item.options && (
        <div className="product-info_options-container">
          <div className="product-info_options-title">
            {optionsName}: {currentOption.name}
          </div>
          <div className="product-info_options">
            {options.map((it) => {
              const { name } = it;
              return (
                <div className="product-info_options_option" key={name}>
                  <input
                    type="radio"
                    id={name}
                    name="option"
                    checked={name === currentOption.name}
                    onChange={(e) => {
                      setCurrentOption(it);
                      searchParams.set('option', it.name);
                      setSearchParams(searchParams);
                    }}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {item.variants && (
        <div className="product-info_variants-container">
          {item.variants.Sponge && (
            <div>
              <div className="product-info_variants-title">
                Sponge: {currentSpongeVariant}
              </div>
              <div className="product-info_variants">
                {spongeVariants.map((it) => {
                  return (
                    <div className="product-info_variants_variant" key={it}>
                      <input
                        type="radio"
                        id={it}
                        name="sponge-variant"
                        checked={it === currentSpongeVariant}
                        onChange={(e) => {
                          setCurrentSpongeVariant(it);
                          searchParams.set('sponge', it);
                          setSearchParams(searchParams);
                        }}
                      />
                      <label htmlFor={it}>{it}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {item.variants['Filling Icing'] && (
            <div>
              <div className="product-info_variants-title">
                Filling Icing: {currentFillVariant}
              </div>
              <div className="product-info_variants">
                {fillVariants.map((it) => {
                  return (
                    <div className="product-info_variants_variant" key={it}>
                      <input
                        type="radio"
                        id={it}
                        name="fill-variant"
                        checked={it === currentFillVariant}
                        onChange={(e) => {
                          setCurrentFillVariant(it);
                          searchParams.set('fill', it);
                          setSearchParams(searchParams);
                        }}
                      />
                      <label htmlFor={it}>{it}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="product-info_abilities">
        {item.abilities.includes('cake-sign') && (
          <div className="product-info_abilities_ability">
            <p className="product-info_abilities_ability_title">
              <LuCake />
              Do you want to write something on the cake?
            </p>
            <div className="product-info_abilities_ability_inputs">
              <div>
                <input
                  type="radio"
                  id="cake-sign-option-attr-no"
                  name="cake-sign-option"
                  checked={!cakeSignOption}
                  onChange={(e) => setCakeSignOption(!e.target.checked)}
                />
                <label htmlFor="cake-sign-option-attr-no" />
                No
              </div>
              <div>
                <input
                  type="radio"
                  id="cake-sign-option-attr-yes"
                  name="cake-sign-option"
                  checked={cakeSignOption}
                  onChange={(e) => setCakeSignOption(e.target.checked)}
                />
                <label htmlFor="cake-sign-option-attr-yes" />
                Yes
              </div>
            </div>
            <div
              className={`product-info_abilities_ability_details ${
                cakeSignOption ? '' : 'hidden'
              }`}
            >
              <p className="product-info_abilities_ability_details_title">
                What do you want to write on the cake?
              </p>
              <textarea
                className="product-info_abilities_ability_details_textarea cake"
                onChange={(e) => setCakeSignText(e.target.value)}
                value={cakeSignText}
                id="cake-text"
                name="cake-text"
                maxLength="30"
                required
              />
              <div className="product-info_abilities_ability_details_characters-count">
                {cakeSignText.length}/30 characters used
              </div>
            </div>
          </div>
        )}
        {item.abilities.includes('card-message') && (
          <div className="product-info_abilities_ability">
            <p className="product-info_abilities_ability_title">
              <TbPencilHeart />
              Do you want to include a hand-written card message?
            </p>
            <div className="product-info_abilities_ability_inputs">
              <div>
                <input
                  type="radio"
                  id="card-sign-option-attr-no"
                  name="card-sign-option"
                  checked={!cardSignOption}
                  onChange={(e) => setCardSignOption(!e.target.checked)}
                />
                <label htmlFor="card-sign-option-attr-no" />
                No
              </div>
              <div>
                <input
                  type="radio"
                  id="card-sign-option-attr-yes"
                  name="card-sign-option"
                  checked={cardSignOption}
                  onChange={(e) => setCardSignOption(e.target.checked)}
                />
                <label htmlFor="card-sign-option-attr-yes" />
                Yes
              </div>
            </div>
            <div
              className={`product-info_abilities_ability_details ${
                cardSignOption ? '' : 'hidden'
              }`}
            >
              <p className="product-info_abilities_ability_details_title">
                What do you want to write on the card?
              </p>
              <textarea
                className="product-info_abilities_ability_details_textarea card"
                onChange={(e) => setCardSignText(e.target.value)}
                value={cardSignText}
                id="card-text"
                name="card-text"
                maxLength="180"
                required
              />
              <div className="product-info_abilities_ability_details_characters-count">
                {cardSignText.length}/180 characters used
              </div>
            </div>
          </div>
        )}
      </div>
      <button className="product-info_add-to-cart-btn">
        <CiShoppingCart />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductInfo;
