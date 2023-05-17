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
      libraries: ["places"],
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
            zoom: 13,
          });

          // Create Heatmap overlay in nearby area
          const request = {
            location: currentLocation,
            radius: '500',
            type: ['bars']
            // query: "Los Pinos Mexican food",
            // fields: ["keyword", "geometry"],
          };

          let service = new google.maps.places.PlacesService(map);
          service.nearbySearch(request, nearbyResults);


          // Add a marker for the user's current location
          new google.maps.Marker({
            position: currentLocation,
            map,
          });
        });


      } else {
        const map = new Map(mapRef.current, {
          center: { lat: defLocation.lat, lng: defLocation.lng },
          zoom: 13,
        });
      }
    });
  }, []);

  function nearbyResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("Results:", results);
    }
  }

  return (
    <div ref={mapRef} style={{ height: "90%", width: "100%" }}>
      Map Loading...
    </div>
  );
}
