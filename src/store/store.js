import { makeAutoObservable } from 'mobx';

import isEqualWith from 'lodash/isEqualWith';
import omit from 'lodash/omit';

class Store {
  cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  menuItemsLimit = 24;
  overlaySpinner = false;
  hamburgerMenu = false;
  snackbar = {};
  locationKey = null;

  constructor() {
    makeAutoObservable(this);
  }

  setLocationKey(key) {
    this.locationKey = key;
  }
  setMenuItemsLimit(limit) {
    this.menuItemsLimit = limit;
  }

  setOverlaySpinner(bool) {
    this.overlaySpinner = bool;
  }

  toggleHamburgerMenu(bool) {
    this.hamburgerMenu = bool;
  }

  addItemToCart(item) {
    const cartItem = this.cartItems.find((it) =>
      isEqualWith(omit(it, ['quantity']), omit(item, ['quantity']))
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      this.cartItems.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.setSnackbar({ open: true, item: item });
  }

  removeItemFromCart(item) {
    this.cartItems = this.cartItems.filter((it) => it !== item);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  setItemCountInCart(item, count) {
    const cartItem = this.cartItems.find((it) =>
      isEqualWith(omit(it, ['quantity']), omit(item, ['quantity']))
    );
    cartItem.quantity = +count;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  incrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      isEqualWith(omit(it, ['quantity']), omit(item, ['quantity']))
    );
    cartItem.quantity < 99
      ? (cartItem.quantity = cartItem.quantity += 1)
      : null;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  decrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      isEqualWith(omit(it, ['quantity']), omit(item, ['quantity']))
    );
    cartItem.quantity > 1 ? (cartItem.quantity = cartItem.quantity -= 1) : null;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');
  }

  setSnackbar(config) {
    this.snackbar = config;
  }
}

export default new Store();
