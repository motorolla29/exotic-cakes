import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LuCake } from 'react-icons/lu';
import { TbPencilHeart } from 'react-icons/tb';
import { CiShoppingCart } from 'react-icons/ci';
import { animate } from 'framer-motion';

import store from '../../store/store';

import './product-info.sass';

const ProductInfo = ({ item, images, category }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const optionsName = item.options ? Object.entries(item.options)[0][0] : null;
  const options = item.options ? Object.entries(item.options)[0][1] : null;
  const variants = item.variants;
  const spongeVariants = variants ? variants.Sponge : null;
  const fillVariants = variants ? variants['Filling Icing'] : null;

  const [currentOption, setCurrentOption] = useState(
    options
      ? options.find((option) => option.name === searchParams.get('option')) ||
          options[0]
      : null
  );
  const [currentSpongeVariant, setCurrentSpongeVariant] = useState(
    spongeVariants
      ? spongeVariants.find(
          (variant) => variant === searchParams.get('sponge')
        ) || spongeVariants[0]
      : null
  );
  const [currentFillVariant, setCurrentFillVariant] = useState(
    fillVariants
      ? fillVariants.find((variant) => variant === searchParams.get('fill')) ||
          fillVariants[0]
      : null
  );

  const [cakeSignOption, setCakeSignOption] = useState(false);
  const [cardSignOption, setCardSignOption] = useState(false);
  const [cakeSignText, setCakeSignText] = useState('');
  const [cardMessageText, setCardMessageText] = useState('');

  const onAddToCartButtonClick = () => {
    const snackbarRef = document.querySelector('.cart-snackbar');
    const counterRef = document.querySelector(
      '.header_right-side_cart-icon_counter'
    );
    const sequence = [
      [
        snackbarRef,
        {
          transform: ['translateY(0)', 'translateY(-2em)', 'translateY(0)'],
        },
      ],
      [counterRef, { transform: ['scale(1)', 'scale(1.25)', 'scale(1)'] }],
    ];
    if (store.snackbar.open && snackbarRef) {
      animate(sequence);
    }

    store.addItemToCart({
      id: item.id,
      category: category,
      title: item.title,
      image: images[0],
      price: currentOption ? currentOption.price : item.price,
      optionName: optionsName,
      option: currentOption ? currentOption.name : null,
      spongeVariant: currentSpongeVariant || null,
      fillVariant: currentFillVariant || null,
      cartMessage:
        cardSignOption && cardMessageText.length > 0 ? cardMessageText : null,
      cakeSign: cakeSignOption && cakeSignText.length > 0 ? cakeSignText : null,
      quantity: 1,
    });
  };

  return (
    <div className="product-info">
      <h1 className="product-info_title">{item.title}</h1>
      <div className="product-info_price">
        ${currentOption ? currentOption.price : item.price}
      </div>
      <div className="product-info_description">{item.description}</div>

      {options && (
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
                      setSearchParams(searchParams, { replace: true });
                    }}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {variants && (
        <div className="product-info_variants-container">
          {spongeVariants && (
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
                          setSearchParams(searchParams, { replace: true });
                        }}
                      />
                      <label htmlFor={it}>{it}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {fillVariants && (
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
                          setSearchParams(searchParams, { replace: true });
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
                onChange={(e) => setCardMessageText(e.target.value)}
                value={cardMessageText}
                id="card-text"
                name="card-text"
                maxLength="180"
                required
              />
              <div className="product-info_abilities_ability_details_characters-count">
                {cardMessageText.length}/180 characters used
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        onClick={onAddToCartButtonClick}
        className="product-info_add-to-cart-btn"
      >
        <CiShoppingCart />
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductInfo;
