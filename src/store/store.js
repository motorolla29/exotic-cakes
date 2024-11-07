import { makeAutoObservable } from 'mobx';

var _ = require('lodash');

class Store {
  //cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems = [
    {
      stringParams: '',
      id: '3dfb6a2e-c6c4-42c1-a133-fcc50bcbfec4',
      category: 'cookies',
      title: 'Bright Pokemon Cookies with Marmelade',
      image: '6218354347_upscale (39).png',
      price: 16,
      optionName: 'Size',
      option: '4 pcs (Big)',
      spongeVariant: null,
      fillVariant: null,
      cartMessage: null,
      cakeSign: null,
      quantity: 5,
    },
    {
      stringParams: '',
      id: '84548659-df73-4f9f-8233-3554b9de4b32',
      category: 'all',
      title: 'Winni Pie',
      image: 'OIG2.jpg',
      price: 29,
      optionName: 'Weight',
      option: '1.2 kg',
      spongeVariant: 'Vanilla',
      fillVariant: 'Honey Icing',
      cartMessage: null,
      cakeSign: null,
      quantity: 3,
    },
    {
      stringParams: '',
      id: 'e55c690c-2acd-456f-998d-0a78c5fb2eaf',
      category: 'all',
      title: 'Lavender Dreams Cake',
      image: 'OIG1.RDb9vYqFs1Lw7W95xH.jpg',
      price: 49,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Salted Caramel',
      fillVariant: 'Blue Vanilla Buttercream',
      cartMessage: null,
      cakeSign: null,
      quantity: 1,
    },
    {
      stringParams: '',
      id: 'bfc8c3cc-da2b-45bb-9c54-f22f8df42368',
      category: 'all',
      title: 'Strawberry Dream Tram',
      image: 'OIG2 (7).jpg',
      price: 59,
      optionName: 'Size',
      option: '6-inch',
      spongeVariant: 'Strawberry Ripple',
      fillVariant: 'Strawberry Buttercream',
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
