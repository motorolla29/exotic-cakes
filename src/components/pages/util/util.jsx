import { encode } from 'blurhash';

import { baseImagesURL, baseMerchImagesURL } from '../../../const';
import MENU from '../../../mocks/updated-data-with-hash.json';
import MERCH from '../../../mocks/updated-merch-data-with-hash.json';

import './util.sass';

const loadImage = async (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
    img.crossOrigin = 'Anonymous';
  });
const getImageData = (image) => {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d');
  if (context) {
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height);
  }
  throw Error('There is no canvas context');
};
const reduceImgUrlDimensions = (input, size = '19x19') => {
  const regex = /\d+x\d+/;
  const match = input.match(regex);

  if (match) {
    const replacement = size;
    return input.replace(regex, replacement);
  } else {
    console.info('Dimensions pattern not found so returning input as is');
    return input;
  }
};
const encodeImageToBlurhash = async (imageUrl) => {
  const image = await loadImage(imageUrl);
  const imageData = getImageData(image);
  if (imageData)
    return encode(imageData.data, imageData.width, imageData.height, 4, 4);
  throw Error('There is no image data');
};
const getBlurhash = (src, size = '19x19') => {
  (async () => {
    const hash = await encodeImageToBlurhash(reduceImgUrlDimensions(src, size));
    console.log(hash);
  })();
};

const Util = () => {
  const onButtonClick = () => {
    // ПЕРЕДЕЛКА СТРУКТУРЫ ДАННЫХ ПО КАЖДОМУ ОБЪЕКТУ ТОВАРА С ИМЕЮЩЕГОСЯ В НЕМ МАССИВА СТРОК С SRC КАРТИНКИ НА ОБЪЕКТ С ПОЛЯМИ SRC И HASH ДЛЯ КАЖДОЙ КАРТИНКИ
    // Promise.all(
    //   MERCH.map(async (item) => {
    //     return {
    //       ...item,
    //       images: await Promise.all(
    //         item.images.map(async (i) => {
    //           return {
    //             src: i,
    //             hash: await encodeImageToBlurhash(
    //               reduceImgUrlDimensions(`${baseMerchImagesURL}/${i}`, '19x19')
    //             ),
    //           };
    //         })
    //       ),
    //     };
    //   })
    // ).then((arr) => console.log(arr));
    // ВЫВЕСТИ БЛЮРХЭШ КАРТИНКИ ПО ССЫЛКЕ
    //getBlurhash(`${baseImagesURL}/no-photo.png`);
  };

  return (
    <div className="test-page">
      <button onClick={onButtonClick} className="test-button">
        RUN
      </button>
    </div>
  );
};

export default Util;
