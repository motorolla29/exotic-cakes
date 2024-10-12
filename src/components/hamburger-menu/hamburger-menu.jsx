import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import { TbArrowBigRightLines } from 'react-icons/tb';
import { customScrollController } from '../../utils';

import store from '../store/store';

import './hamburger-menu.sass';

const HamburgerMenu = observer(() => {
  const onMenuLinkClick = () => {
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
  });

  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(2em)' }}
      animate={{ opacity: 1, transform: 'translateY(0)' }}
      exit={{ opacity: 0, transform: 'translateY(2em)' }}
      className="hamburger-menu"
    >
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={onMenuLinkClick}
        to="/"
      >
        <TbArrowBigRightLines />
        <span>Home</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={onMenuLinkClick}
        to="/menus"
      >
        <TbArrowBigRightLines />
        <span>Menus</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={onMenuLinkClick}
        to="/about"
      >
        <TbArrowBigRightLines />
        <span>About</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={onMenuLinkClick}
        to="/location"
      >
        <TbArrowBigRightLines />
        <span>Location</span>
      </NavLink>
      <NavLink
        onMouseEnter={onMenuLinkMouseEnter}
        onMouseLeave={onMenuLinkMouseLeave}
        onClick={onMenuLinkClick}
        to="/merch"
      >
        <TbArrowBigRightLines />
        <span>Merch</span>
      </NavLink>
    </motion.div>
  );
});

export default HamburgerMenu;
