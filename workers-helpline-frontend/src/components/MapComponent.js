import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = ({ workers }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  // Center of the map (change as needed)
  const center = { lat: 19.0760, lng: 72.8777 };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        {workers.map((worker, index) => (
          <Marker key={index} position={{ lat: parseFloat(worker.lat), lng: parseFloat(worker.lng) }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
