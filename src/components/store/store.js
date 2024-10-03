import { makeAutoObservable } from 'mobx';

class Store {
  productItems = [];
  cartItems = [];
  productItemsLoaded = false;

  constructor() {
    makeAutoObservable(this);
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
