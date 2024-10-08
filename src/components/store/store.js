import { makeAutoObservable } from 'mobx';

class Store {
  menuItems = [];
  cartItems = [];
  overlaySpinner = false;
  hamburgerMenu = false;

  constructor() {
    makeAutoObservable(this);
  }

  setMenuItems(items) {
    this.menuItems = items;
  }

  setOverlaySpinner(bool) {
    this.overlaySpinner = bool;
  }

  toggleHamburgerMenu(bool) {
    this.hamburgerMenu = bool;
  }

  addItemToCart(item) {
    const cartItem = this.cartItems.find((it) => it === item);
    if (cartItem) {
      cartItem.quality += 1;
    } else {
      this.cartItems.push(item);
      cartItem.quality = 1;
    }
  }

  removeItemFromCart(item) {
    const cartItem = this.cartItems.find((it) => it === item);
    cartItem.quality > 1
      ? (cartItem.quality -= 1)
      : this.cartItems.filter((it) => it !== item);
  }

  incrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) => it === item);
    // ...
  }

  decrementItemCountInCart(item) {}
}

export default new Store();
