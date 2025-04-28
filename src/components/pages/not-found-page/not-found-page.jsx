import { Link } from 'react-router-dom';

import CakeIcon404 from '../../../icons/404cake.svg';

import './not-found-page.sass';

const NotFoundPage = () => (
  <div className="not-found-page">
    <div className="not-found-page_inner">
      <CakeIcon404 />
      <p className="not-found-page_inner_text">
        Oops! It seems that such a page does not exist.
      </p>
      <Link to="/" className="not-found-page_inner_link">
        <button>Home Page</button>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
