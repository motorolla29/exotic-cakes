import { useRef, useState } from 'react';
import { Map, Marker, Popup, NavigationControl } from 'react-map-gl/maplibre';
import { animate, AnimatePresence } from 'framer-motion';

import '@maptiler/geocoding-control/style.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import './location-page-map.sass';

const LocationPageMap = () => {
  const mapRef = useRef();
  const markerImageRef = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const onMarkerClickHandler = (e) => {
    e.originalEvent.stopPropagation();
    setShowPopup(true);
    mapRef.current.easeTo({
      center: [-0.126229, 51.508386],
      zoom: 17.5,
      essential: true,
      duration: 1000,
    });
    if (markerImageRef.current) {
      animate(
        markerImageRef.current,
        {
          transform: [
            'rotate(0) translateX(0) translateY(0px)',
            ' translateY(-7px)',
            'rotate(-5deg) translateX(-5px)',

            'rotate(5deg) translateX(5px)',

            'rotate(0) translateX(0) translateY(0)',
          ],
        },
        { duration: 1 }
      );
    }
  };

  return (
    <Map
      id="location-page-map"
      ref={mapRef}
      mapStyle="https://api.maptiler.com/maps/uk-openzoomstack-light/style.json?key=JiORwzpLecOFb1wih0mU"
      attributionControl={false}
      initialViewState={{
        longitude: -0.126229,
        latitude: 51.508386,
        zoom: 17.5,
      }}
      scrollZoom={false}
    >
      <NavigationControl position="top-right" />
      <Marker
        onClick={onMarkerClickHandler}
        longitude={-0.126229}
        latitude={51.508386}
        anchor="bottom"
      >
        <img
          ref={markerImageRef}
          className="map-marker"
          src="/images/map-pin-cake.png"
        />
      </Marker>
      <AnimatePresence>
        {showPopup && (
          <Popup
            longitude={-0.126229}
            latitude={51.508386}
            anchor="top"
            onClose={() => setShowPopup(false)}
          >
            <div className="popup-inner">
              <p className="popup-inner_title">We are here!</p>
              <div className="popup-inner_address">
                <p>10 Dream Street</p>
                <p>London, GB</p>
              </div>
            </div>
          </Popup>
        )}
      </AnimatePresence>
    </Map>
  );
};

export default LocationPageMap;
