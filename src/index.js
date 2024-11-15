import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/app/app';

import './index.sass';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
