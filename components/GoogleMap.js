import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef(null);

  // Google Maps
  // default: San Francisco
  const defLocation = {
    lat: 37.7749,
    lng: -122.4194,
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
      version: "weekly",
    //   ...additionalOptions,
    });

    loader.load().then(async () => {
        const {google} = window;
      const { Map } = await google.maps.importLibrary("maps");

      const map = new Map(mapRef.current, {
        center: { lat: defLocation.lat, lng: defLocation.lng },
        zoom: 8,
      });
    });
  }, []);
  return <div ref={mapRef} style={{ height: "400px" }} >GoogleMap</div>;
}
