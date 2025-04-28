import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/layout';
import HomePage from '../pages/home-page/home-page';
import MenusPage from '../pages/menus-page/menus-page';
import AboutPage from '../pages/about-page/about-page';
import LocationPage from '../pages/location-page/location-page';
import MerchPage from '../pages/merch-page/merch-page';
import CartPage from '../pages/cart-page/cart-page';
import ItemPage from '../pages/item-page/item-page';
import MerchItemPage from '../pages/merch-item-page/merch-item-page';
import Util from '../pages/util/util';
import CheckoutPage from '../pages/checkout-page/checkout-page';
import CheckoutSuccess from '../pages/checkout-success/checkout-success';
import CheckoutFailure from '../pages/checkout-failure/checkout-failure';
import NotFoundPage from '../pages/not-found-page/not-found-page';

import './app.sass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menus/:category?" element={<MenusPage />} />
          <Route path="menus/:category/:id" element={<ItemPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="merch" element={<MerchPage />} />
          <Route path="merch/:merchItemId" element={<MerchItemPage />} />
          <Route path="something-else" element={<div />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="util" element={<Util />} />
          <Route path="checkout-success" element={<CheckoutSuccess />} />
          <Route path="checkout-failure" element={<CheckoutFailure />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
