import GoogleMapReact, { Marker } from "google-map-react";

export default function Map({ location }) {
  const CurrentLocationMarker = ({ text }) => <div>{text}</div>;

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
        <CurrentLocationMarker lat={location.lat} lng={location.lng} text="CURRENT LOCATION" />
      </GoogleMapReact>
    </div>
  );
}
