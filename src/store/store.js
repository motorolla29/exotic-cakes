import { makeAutoObservable } from 'mobx';

var _ = require('lodash');

class Store {
  //cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = [
    {
      stringParams: '',
      id: 'ea3a67dc-abe4-4c12-a3ee-aaadb84f7643',
      category: 'all',
      title: 'Mouse Cheese Fest Cake',
      image: 'OIG3.cE9xxfayoeDOq1NXm.jpg',
      price: 39,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Funfetti',
      fillVariant: 'Cream Cheese Icing',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
    {
      stringParams: '',
      id: 'a8740f7c-7c11-4989-8132-4b2225780830',
      category: 'all',
      title: 'Burger Styled Cake',
      image: '6218354347_upscale (57).png',
      price: 39,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Vanilla',
      fillVariant: 'Chocolate Buttercream',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
    {
      stringParams: '',
      id: 'ad3bb10d-8714-4500-9e01-67534a5ec874',
      category: 'all',
      title: 'Exotic Beds Brand Bed-Cake',
      image: 'HzEhCGrxq_x9gofxElYO-.jpg',
      price: 39,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Vanilla',
      fillVariant: 'Cream Cheese Icing',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
    {
      stringParams: '',
      id: 'acb6bb8c-cbf2-4e57-aa46-2bf89e918232',
      category: 'all',
      title: 'Mushroom Trip Heart',
      image: '6218354347_upscale (24).png',
      price: 29,
      optionName: 'Weight',
      option: '1.2 kg',
      spongeVariant: 'Vanilla',
      fillVariant: 'Neapolitan',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
    {
      stringParams: '',
      id: '66d272d9-67f6-48ab-b0bc-7a500bffc004',
      category: 'all',
      title: 'New Balance Shoe Cake',
      image: '6218354347_upscale (47).png',
      price: 35,
      optionName: 'Size',
      option: '35 EUR',
      spongeVariant: 'Vanilla',
      fillVariant: 'Chocolate Buttercream',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
  ];
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
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
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
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity = +count;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  incrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity < 99
      ? (cartItem.quantity = cartItem.quantity += 1)
      : null;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  decrementItemCountInCart(item) {
    const cartItem = this.cartItems.find((it) =>
      _.isEqualWith(_.omit(it, ['quantity']), _.omit(item, ['quantity']))
    );
    cartItem.quantity > 1 ? (cartItem.quantity = cartItem.quantity -= 1) : null;
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  setSnackbar(config) {
    this.snackbar = config;
  }
}

export default new Store();
