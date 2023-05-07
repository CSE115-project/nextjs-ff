import GoogleMapReact, { Marker } from "google-map-react";
import {useState, useEffect} from 'react';

export default function Map() {
  const CurrentLocationMarker = ({ text }) => <div>{text}</div>;

  // Google Maps
  // default: San Francisco
  const defLocation = {
    lat: 37.7749,
    lng: -122.4194,
  };
  const [location, setLocation] = useState(defLocation);

  // Sets current location - chat.openai.com
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  let center = { lat: location.lat, lng: location.lng };
  let zoom = 11;

  console.log("location:", location);
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
        center={center}
        zoom={zoom}
      >
        <CurrentLocationMarker
          lat={location.lat}
          lng={location.lng}
          text="CURRENT LOCATION"
        />
      </GoogleMapReact>
    </div>
  );
}
