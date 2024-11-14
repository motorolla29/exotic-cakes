import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { animate, motion } from 'framer-motion';

import { TbPencilHeart } from 'react-icons/tb';
import { LuCake } from 'react-icons/lu';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { TiPlusOutline } from 'react-icons/ti';
import { TiMinusOutline } from 'react-icons/ti';

import useWindowSize from '../../hooks/use-window-size';
import store from '../../store/store';
import { baseImagesURL, baseMerchImagesURL } from '../../const';
import { cartItemExitAnimationSequence } from '../../animations';
import BlurhashImage from '../blurhash-image/blurhash-image';

import './cart-item.sass';

const CartItem = observer(({ item }) => {
  const {
    type,
    stringParams,
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
    merchVariants,
  } = item;
  const [ww] = useWindowSize();
  const cartItemRef = useRef();
  const [deletion, setDeletion] = useState(false);
  const [deletionTimeout, setDeletionTimeout] = useState(null);
  const [animateDeletionTimeout, setAnimateDeletionTimeout] = useState(null);

  const onQuantityInputHandler = (e) => {
    e.target.value = ~~e.target.value;
    if (e.target.value > 0 && e.target.value < 100) {
      store.setItemCountInCart(item, e.target.value);
    } else {
      console.log(`${e.target.value} is invalid value`);
      e.target.value = item.quantity;
    }
  };

  const onDeleteBinClick = () => {
    setDeletion(true);
    setAnimateDeletionTimeout(
      setTimeout(() => {
        animate(cartItemExitAnimationSequence(cartItemRef.current));
      }, 4000)
    );
    setDeletionTimeout(
      setTimeout(() => {
        store.removeItemFromCart(item);
      }, 4600)
    );
  };

  const onCancelDeletionButtonClick = () => {
    if (deletionTimeout) {
      clearTimeout(animateDeletionTimeout);
      clearTimeout(deletionTimeout);
    }
    setDeletion(false);
  };

  return (
    <motion.div ref={cartItemRef} className="cart-item">
      <div className={`cart-item-container ${deletion && 'deletion'}`}>
        <div className="cart-item_main">
          <Link
            to={
              type === 'merch'
                ? `/merch/${id}?${stringParams ? stringParams : ''}`
                : `/menus/${category}/${id}?${stringParams ? stringParams : ''}`
            }
            className="cart-item_main_img-link"
          >
            <div className="cart-item_main_img-container">
              <BlurhashImage
                src={`${
                  type === 'merch' ? baseMerchImagesURL : baseImagesURL
                }/preview/${image.src}`}
                hash={image.hash}
              />
            </div>
          </Link>
          <div className="cart-item_main_info">
            <Link
              to={
                type === 'merch' ? `/merch/${id}` : `/menus/${category}/${id}`
              }
            >
              <p className="cart-item_main_info_title">{title}</p>
            </Link>
            {(ww <= 768 && ww > 480) || (ww <= 480 && !deletion) ? (
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
            {ww > 480 || !deletion ? (
              <>
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
                {merchVariants
                  ? Object.entries(merchVariants).map((it) => {
                      return (
                        <p key={it} className="cart-item_main_info_filling">
                          {it[0]}: <span>{it[1]}</span>
                        </p>
                      );
                    })
                  : null}
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
              </>
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
            <RiDeleteBin5Line onClick={onDeleteBinClick} />
          </div>
        </div>
      </div>
      {deletion && ww > 480 && (
        <div className="cart-item_cancel-delete-button-container">
          <div
            onClick={onCancelDeletionButtonClick}
            className="cart-item_cancel-delete-button"
          >
            <svg>
              <rect></rect>
            </svg>
            <span>Cancel</span>
          </div>
        </div>
      )}
      {deletion && ww <= 480 && (
        <div className="cart-item_cancel-delete-progressbar-sm-container">
          <div className="cart-item_cancel-delete-progressbar-sm">
            <div className="back-line"></div>
            <div className="front-line"></div>
            <span onClick={onCancelDeletionButtonClick}>Cancel</span>
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default CartItem;
