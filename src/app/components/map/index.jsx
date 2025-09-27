"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useRef } from 'react';

// Necesario para solucionar problemas con los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapContent = ({ lat, lon, address }) => {
  const map = useMap();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      map.setView([lat, lon], map.getZoom());
      initialized.current = true;
    }
  }, [lat, lon, map]);

  return (
    <Marker position={[lat, lon]}>
      <Popup>{address}</Popup>
    </Marker>
  );
};

const Map = ({ lat, lon, className, address }) => {
  const mapRef = useRef(null);
  const key = `${lat}-${lon}-${Date.now()}`;

  return (
    <div className={`maps ${className}`} key={key}>
      <MapContainer
        center={[lat, lon]}
        zoom={20}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapContent lat={lat} lon={lon} address={address} />
      </MapContainer>
    </div>
  );
};

export default Map;