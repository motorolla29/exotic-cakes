import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { animate } from 'framer-motion';
import { CiShoppingCart } from 'react-icons/ci';

import store from '../../store/store';

import './merch-info.sass';

const MerchInfo = ({ item }) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const optionsName = item.options ? Object.entries(item.options)[0][0] : null;
  const options = item.options ? Object.entries(item.options)[0][1] : null;
  const variants = item.variants;
  const [currentOption, setCurrentOption] = useState(
    options
      ? options.find((option) => option.name === searchParams.get('option')) ||
          options[0]
      : null
  );
  const [currentVariants, setCurrentVariants] = useState(
    variants
      ? JSON.parse(searchParams.get('variants')) ||
          Object.fromEntries(
            Object.entries(variants).map((variant) => {
              return [variant[0], variant[1][0]];
            })
          )
      : null
  );

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
      title: item.title,
      image: item.images[0],
      price: currentOption ? currentOption.price : item.price,
      optionName: optionsName,
      option: currentOption ? currentOption.name : null,
      variant: variant,
      quantity: 1,
    });
  };

  return (
    <div className="merch-info">
      <h1 className="merch-info_title">{item.title}</h1>
      <div className="merch-info_price">
        ${currentOption ? currentOption.price : item.price}
      </div>
      {options && (
        <div className="merch-info_options-container">
          <div className="merch-info_options-title">
            {`${optionsName}: `}
            <span>{currentOption.name}</span>
          </div>
          <div className="merch-info_options">
            {options.map((it) => {
              const { name } = it;
              return (
                <div className="merch-info_options_option" key={name}>
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
        <div className="merch-info_variants-container">
          {Object.entries(variants).map((variant) => {
            return (
              <div key={variant}>
                <div className="merch-info_variants-title">
                  {`${variant[0]}: `}
                  <span>{currentVariants[variant[0]]}</span>
                </div>
                <div className="merch-info_variants">
                  {variant[1].map((it) => {
                    return (
                      <div className="merch-info_variants_variant" key={it}>
                        <input
                          type="radio"
                          id={it}
                          name={variant[0]}
                          checked={
                            currentVariants[variant[0]] &&
                            currentVariants[variant[0]] === it
                          }
                          onChange={(e) => {
                            setCurrentVariants({
                              ...currentVariants,
                              [variant[0]]: it,
                            });
                            searchParams.set(
                              'variants',
                              JSON.stringify({
                                ...currentVariants,
                                [variant[0]]: it,
                              })
                            );
                            setSearchParams(searchParams, { replace: true });
                          }}
                        />
                        <label htmlFor={it}>{it}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={onAddToCartButtonClick}
        className="merch-info_add-to-cart-btn"
      >
        <CiShoppingCart />
        ADD TO CART
      </button>
    </div>
  );
};

export default MerchInfo;
