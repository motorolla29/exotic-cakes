import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

import { MAPTILER_KEY, GEOAPIFY_KEY, LONDON_BOUNDS } from '../../const';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import './checkout-shipping-map.sass';

const CheckoutShippingMap = ({
  onAddressConfirm,
  setError,
  confirmedAddress,
  closeMap,
}) => {
  const mapRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isInsideLondon, setIsInsideLondon] = useState(true);
  const markerRef = useRef(null);

  useEffect(() => {
    setSelectedAddress(confirmedAddress);
    const map = new maplibregl.Map({
      container: mapRef.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_KEY}`,
      //style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${GEOAPIFY_KEY}`,
      center: [-0.1276, 51.5072], // London center
      zoom: 10,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('click', async (e) => {
      const { lng, lat } = e.lngLat;

      try {
        const response = await fetch(
          `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${MAPTILER_KEY}&language=en`
        );
        // const response = await fetch(
        //   `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEOAPIFY_KEY}`
        // );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const place = data.features[0];
          // const postcode = place.properties.postcode || '';
          // const addressLabel =
          //   place.properties.formatted || 'Selected location';

          // setSelectedAddress({
          //   label: addressLabel,
          //   coords: { lat, lng },
          //   postcode,
          // });

          setSelectedAddress({
            label: place.place_name,
            coords: { lat, lng },
            postcode:
              place.context?.find((ctx) => ctx.id?.startsWith('postal_code'))
                ?.text || '',
          });

          // Проверка границ
          const [sw, ne] = LONDON_BOUNDS;
          const isInside =
            lng >= sw[0] && lng <= ne[0] && lat >= sw[1] && lat <= ne[1];

          setIsInsideLondon(isInside);
          setShowConfirm(isInside);

          if (markerRef.current) markerRef.current.remove();
          markerRef.current = new maplibregl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);
        }
      } catch (err) {
        console.error('Geocoding failed:', err);
      }
    });

    return () => map.remove();
  }, []);

  const handleConfirm = () => {
    if (!selectedAddress) return;

    if (!isInsideLondon) {
      setError('We only deliver within Greater London.');
      setShowConfirm(false);
      return;
    }

    setError(null);
    onAddressConfirm(selectedAddress);
    setShowConfirm(false);
    closeMap();
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" />

      {showConfirm && selectedAddress && (
        <div className="confirm-popup">
          <p>Deliver to this address?</p>
          <p className="confirm-address">{selectedAddress.label}</p>
          <button className="confirm-button" onClick={handleConfirm}>
            Yes, confirm
          </button>
        </div>
      )}
      {!showConfirm && selectedAddress && !isInsideLondon && (
        <div className="error-popup">
          <p>Sorry, we only deliver within Greater London.</p>
          <p className="confirm-address">{selectedAddress.label}</p>
        </div>
      )}

      {confirmedAddress && (
        <div className="confirmed-address">
          Confirmed Address: <span>{confirmedAddress}</span>
        </div>
      )}

      {!confirmedAddress && !showConfirm && (
        <div className="confirmed-address">
          Click on the map to select the delivery address
        </div>
      )}
    </div>
  );
};

export default CheckoutShippingMap;
