import { useState, useEffect, useRef, memo } from 'react';
import { Blurhash } from 'react-blurhash';
import { motion } from 'framer-motion';

import './blurhash-image.sass';
import { delay } from 'lodash';

const BlurhashImage = ({
  src,
  hash,
  transitionDuration = 0.2,
  withBackgroundCanvas = false,
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    let observer;
    if (IntersectionObserver) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // when image is visible in the viewport + rootMargin
            if (entry.intersectionRatio > 0 || entry.isIntersecting) {
              setImageSrc(src);
              imageRef?.current && observer.unobserve(imageRef?.current);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: '20%',
        }
      );
      imageRef?.current && observer.observe(imageRef?.current);
    } else {
      // Old browsers fallback
      setImageSrc(src);
    }
    return () => {
      imageRef?.current && observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div className="blurhash-image">
      {withBackgroundCanvas ? (
        <div className="blurhash-image_canvas-container">
          <Blurhash
            className="blurhash-image_canvas"
            hash={hash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      ) : (
        <motion.div
          initial={{ visibility: 'visible', opacity: 1 }}
          animate={{
            visibility: imageLoaded ? 'hidden' : 'visible',
            opacity: imageLoaded ? 0 : 1,
          }}
          transition={{
            visibility: { delay: transitionDuration + 0.4 },
            opacity: {
              delay: transitionDuration,
              duration: 0.4,
            },
          }}
          className="blurhash-image_canvas-container"
        >
          <Blurhash
            className="blurhash-image_canvas"
            hash={hash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </motion.div>
      )}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoaded ? 1 : 0,
        }}
        transition={{
          opacity: { duration: transitionDuration, ease: 'easeIn' },
        }}
        ref={imageRef}
        className="blurhash-image_image"
        src={imageSrc}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
};

export default memo(BlurhashImage);
