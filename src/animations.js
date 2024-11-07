export const firstBlockAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.75,
    },
  },
};
export const blockAnimation = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 1.5,
    },
  },
};

export const cartItemExitAnimationSequence = (ref) => {
  return [
    [
      ref,
      {
        x: '-100%',
        opacity: 0,
        transition: {
          ease: 'easeIn',
          duration: 0.5,
        },
      },
    ],
    [
      ref,
      {
        height: 0,
        padding: 0,
        transition: {
          ease: 'easeIn',
          delay: 0.25,
          duration: 0.25,
        },
      },
    ],
  ];
};
