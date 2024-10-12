export const customScrollController = {
  scroll: 0,
  disableScroll() {
    customScrollController.scroll =
      window.scrollY || document.documentElement.scrollTop;
    document.body.style.setProperty('position', 'fixed');
    document.body.style.setProperty(
      'top',
      `${-customScrollController.scroll}px`
    );
    document.querySelector('.header-drip').classList.remove('hidden');
  },
  enableScroll() {
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    window.scrollTo(0, customScrollController.scroll);
  },
};
