import { useEffect, useState } from 'react';

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

export const isInDeliveryZone = (coords, bounds) => {
  const [[swLon, swLat], [neLon, neLat]] = bounds;

  return (
    coords.lng >= swLon &&
    coords.lng <= neLon &&
    coords.lat >= swLat &&
    coords.lat <= neLat
  );
};

export const getDistanceInKm = (coord1, coord2) => {
  const R = 6371; // Радиус Земли в км
  const toRad = (deg) => deg * (Math.PI / 180);

  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) *
      Math.cos(toRad(coord2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 — воскресенье, 6 — суббота
};

export const calculateShippingCost = (
  deliveryCoords,
  shopCoords,
  deliveryDate
) => {
  if (!deliveryCoords) return 0;

  const distance = getDistanceInKm(deliveryCoords, shopCoords);

  let shippingCost = 5 + 0.25 * distance; // 5$ + 0.25$ за каждый км

  // Если день доставки выходной, добавляем 5$
  if (isWeekend(deliveryDate)) {
    shippingCost += 5;
  }

  return shippingCost;
};
