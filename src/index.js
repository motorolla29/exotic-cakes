import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';

import App from './components/app/app';

import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <Helmet>
      <title>Exotic Cakes</title>
    </Helmet>
    <App />
  </StrictMode>
);
