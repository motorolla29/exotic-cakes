import { makeAutoObservable } from 'mobx';

var _ = require('lodash');

class Store {
  cartItems = [];
  overlaySpinner = false;
  hamburgerMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  setOverlaySpinner(bool) {
    this.overlaySpinner = bool;
  }

  toggleHamburgerMenu(bool) {
    this.hamburgerMenu = bool;
  }

  addItemToCart(item) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.cartItems.push(item);
    }
    console.log(this.cartItems);
  }

  removeItemFromCart(item) {
    const cartItem = this.cartItems.find((it) => it === item);
    cartItem.quantity > 1
      ? (cartItem.quantity -= 1)
      : this.cartItems.filter((it) => it !== item);
  }

  incrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) => it === item);
    // ...
  }

  decrementItemCountInCart(item) {}
}

export default new Store();
