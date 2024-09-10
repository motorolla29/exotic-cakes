import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/layout';
import HomePage from '../pages/home-page/home-page';
import MenusPage from '../pages/menus-page/menus-page';
import AboutPage from '../pages/about-page/about-page';
import LocationPage from '../pages/location-page/location-page';
import MerchPage from '../pages/merch-page/merch-page';

import './app.sass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="menus" element={<MenusPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="merch" element={<MerchPage />} />
          <Route path="something-else" element={<div />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
