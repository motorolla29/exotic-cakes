import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import App from './components/app/app';

import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>Exotic Cakes</title>
      </Helmet>
      <App />
    </HelmetProvider>
  </StrictMode>
);
