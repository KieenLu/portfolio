const animateFade = (delay: number) => {
  return {
    hidden: {
      x: 0,
      y: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.25, 0.25, 0.55],
      },
      translateX: 200,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.55],
      },
      translateX: 0,
    },
  };
};

export default animateFade;
