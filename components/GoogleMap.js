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
      const { google } = window;
      const { Map } = await google.maps.importLibrary("maps");

      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // Create a new map centered on the user's current location
          const map = new Map(mapRef.current, {
            center: currentLocation,
            zoom: 8,
          });

          // Add a marker for the user's current location
          new google.maps.Marker({
            position: currentLocation,
            map,
          });
        });
      } else {
        const map = new Map(mapRef.current, {
          center: { lat: defLocation.lat, lng: defLocation.lng },
          zoom: 11,
        });
      }
    });
  }, []);
  return (
    <div ref={mapRef} style={{ height: "90%", width: "100%" }}>
      GoogleMap
    </div>
  );
}
