import GoogleMapReact from "google-map-react";

export default function Map({ location }) {
  let center = { lat: location.lat, lng: location.lng };
  let zoom = 11;
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
        center={center}
        zoom={zoom}
      ></GoogleMapReact>
    </div>
  );
}
