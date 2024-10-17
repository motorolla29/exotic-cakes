import { makeAutoObservable } from 'mobx';

var _ = require('lodash');

class Store {
  cartItems = [
    {
      id: '608504ca-34b2-42e8-aac8-583cd712b652',
      category: 'all',
      title: 'Bike Lover Cake',
      image: '/images/catalog/OIG1 (3).jpg',
      price: 39,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Red Velvet',
      fillVariant: 'Cream Cheese Icing',
      cartMessage: 'tsejgfdjjftg',
      cakeSign: 'dsfsdf',
      quantity: 1,
    },
    {
      id: 'ea3a67dc-abe4-4c12-a3ee-aaadb84f7643',
      category: 'all',
      title: 'Mouse Cheese Fest Cake',
      image: '/images/catalog/OIG3 (2).jpg',
      price: 99,
      optionName: 'Size',
      option: '10-inch',
      spongeVariant: 'Funfetti',
      fillVariant: 'Cream Cheese Icing',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
  ];
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
    this.cartItems = this.cartItems.filter((it) => it !== item);
  }

  setItemCountInCart(item, count) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity = +count;
  }

  incrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity < 99
      ? (cartItem.quantity = cartItem.quantity += 1)
      : null;
  }

  decrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity > 1 ? (cartItem.quantity = cartItem.quantity -= 1) : null;
  }
}

export default new Store();
