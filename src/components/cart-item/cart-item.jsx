import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { TbPencilHeart } from 'react-icons/tb';
import { LuCake } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TiPlusOutline } from 'react-icons/ti';
import { TiMinusOutline } from 'react-icons/ti';

import useWindowSize from '../../hooks/use-window-size';
import { loadImagePromise } from '../../utils';
import store from '../../store/store';
import { baseImagesURL } from '../../const';

import './cart-item.sass';

const CartItem = observer(({ item }) => {
  const {
    id,
    category,
    title,
    price,
    quantity,
    image,
    optionName,
    option,
    spongeVariant,
    fillVariant,
    cakeSign,
    cartMessage,
  } = item;

  const [ww] = useWindowSize();
  const [productImageUrl, setProductImageUrl] = useState('');

  useEffect(() => {
    loadImagePromise(baseImagesURL, image)
      .then((url) => {
        setProductImageUrl(url);
      })
      .catch((defaultUrl) => {
        setProductImageUrl(defaultUrl);
      });
  }, []);

  const onQuantityInputHandler = (e) => {
    e.target.value = ~~e.target.value;
    if (e.target.value > 0 && e.target.value < 100) {
      store.setItemCountInCart(item, e.target.value);
    } else {
      console.log(`${e.target.value} is invalid value`);
      e.target.value = item.quantity;
    }
  };

  return (
    <div key={JSON.stringify(item)} className="cart-item">
      <div className="cart-item_main">
        <Link to={`/menus/${category}/${id}`} className="cart-item_main_img">
          <img
            src={`${baseImagesURL}/${productImageUrl}`}
            alt="product-image"
          />
        </Link>
        <div className="cart-item_main_info">
          <Link to={`/menus/${category}/${id}`}>
            <p className="cart-item_main_info_title">{title}</p>
          </Link>
          {ww <= 768 ? (
            <div className="cart-item_sm-price-quantity">
              <span className="cart-item_price">
                Price:<span>${price}</span>
              </span>
              <div className="cart-item_counter">
                Quantity:
                <div className="cart-item_counter_input">
                  <TiMinusOutline
                    onClick={() => store.decrementItemCountInCart(item)}
                    className={`${item.quantity < 2 ? 'disabled' : ''}`}
                  />
                  <input
                    defaultValue={item.quantity}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        onQuantityInputHandler(e);
                        e.target.blur();
                      }
                    }}
                    onBlur={onQuantityInputHandler}
                    type="number"
                    min={1}
                    max={99}
                  />
                  <TiPlusOutline
                    onClick={() => store.incrementItemCountInCart(item)}
                    className={`${item.quantity > 98 ? 'disabled' : ''}`}
                  />
                </div>
              </div>
            </div>
          ) : null}
          {option ? (
            <p className="cart-item_main_info_options">
              {`${optionName}: `}
              <span>{option}</span>
            </p>
          ) : null}
          {spongeVariant ? (
            <p className="cart-item_main_info_sponge">
              Sponge: <span>{spongeVariant}</span>
            </p>
          ) : null}
          {fillVariant ? (
            <p className="cart-item_main_info_filling">
              Filling Icing: <span>{fillVariant}</span>
            </p>
          ) : null}
          {cakeSign ? (
            <div className="cart-item_main_info_cake-sign">
              <span>
                <LuCake />
                Write on cake:
              </span>
              <p>{cakeSign}</p>
            </div>
          ) : null}
          {cartMessage ? (
            <div className="cart-item_main_info_card-message">
              <span>
                <TbPencilHeart />
                Card with handwritten text:
              </span>
              <p>{cartMessage}</p>
            </div>
          ) : null}
        </div>
      </div>
      {ww > 768 ? (
        <>
          <p className="cart-item_price">${price}</p>
          <div className="cart-item_counter">
            <div className="cart-item_counter_input">
              <TiMinusOutline
                onClick={() => store.decrementItemCountInCart(item)}
                className={`${item.quantity < 2 ? 'disabled' : ''}`}
              />
              <input
                defaultValue={item.quantity}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onQuantityInputHandler(e);
                    e.target.blur();
                  }
                }}
                onBlur={onQuantityInputHandler}
                type="number"
                min={1}
                max={99}
              />
              <TiPlusOutline
                onClick={() => store.incrementItemCountInCart(item)}
                className={`${item.quantity > 98 ? 'disabled' : ''}`}
              />
            </div>
          </div>
        </>
      ) : null}

      <div className="cart-item_total">
        <div>
          ${price * quantity}
          <RiDeleteBin5Line onClick={() => store.removeItemFromCart(item)} />
        </div>
      </div>
    </div>
  );
});

export default CartItem;
