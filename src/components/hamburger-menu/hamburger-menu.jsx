import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import { TbArrowBigRightLines } from 'react-icons/tb';
import { customScrollController } from '../../utils';

import store from '../../store/store';

import './hamburger-menu.sass';

const HamburgerMenu = observer(() => {
  const location = useLocation();

  const onMenuLinkClick = (targetPath) => {
    const isNavigatingAway = location.pathname !== targetPath;
    if (isNavigatingAway) {
      customScrollController.setShouldRestoreScroll(false);
    }
    store.toggleHamburgerMenu(false);
  };

  const onMenuLinkMouseEnter = (e) => {
    e.target.classList.add('hovered');
  };
  const onMenuLinkMouseLeave = (e) => {
    e.target.classList.remove('hovered');
  };

  useEffect(() => {
    customScrollController.disableScroll();
    return () => {
      customScrollController.enableScroll();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: '2em' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '2em' }}
      className="hamburger-menu"
    >
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={() => onMenuLinkClick('/')}
        to="/"
      >
        <TbArrowBigRightLines />
        <span>Home</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={() => onMenuLinkClick('/menus')}
        to="/menus"
      >
        <TbArrowBigRightLines />
        <span>Menus</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={() => onMenuLinkClick('/about')}
        to="/about"
      >
        <TbArrowBigRightLines />
        <span>About</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={() => onMenuLinkClick('/location')}
        to="/location"
      >
        <TbArrowBigRightLines />
        <span>Location</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={() => onMenuLinkClick('/merch')}
        to="/merch"
      >
        <TbArrowBigRightLines />
        <span>Merch</span>
      </NavLink>
    </motion.div>
  );
});

export default HamburgerMenu;
