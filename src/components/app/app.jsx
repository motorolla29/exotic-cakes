import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../layout/layout';
import HomePage from '../pages/home-page/home-page';

import './app.sass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
