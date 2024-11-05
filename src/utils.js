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
    setTimeout(() => {
      document.body.style.setProperty('top', `0px`);
    }, 350);
  },
  enableScroll() {
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
  },
  disableScrollWithRetention() {
    customScrollController.scroll =
      window.scrollY || document.documentElement.scrollTop;

    document.body.style.setProperty('position', 'fixed');
    document.body.style.setProperty(
      'top',
      `${-customScrollController.scroll}px`
    );
    document.querySelector('.header-drip').classList.remove('hidden');
  },
  enableScrollWithRetention() {
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    window.scrollTo(0, customScrollController.scroll);
  },
};

export const loadImagePromise = (baseUrl, url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(url);
    };
    image.onerror = () => {
      reject('default.png');
    };
    image.src = `${baseUrl}/${url}`;
  });
};
