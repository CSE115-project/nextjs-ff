import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function GoogleMap() {
  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);


  let placesService;
  
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

          // Initialize PlacesService
          let service = new google.maps.places.PlacesService(map);


          // Perform search and get bars within the current map view
          map.addListener("idle", performSearch);


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
  
// Perform search for bars within the current map view
const performSearch = () => {
  if (!mapRef.current) return;

  const mapInstance = mapRef.current.getMap();
  const bounds = mapInstance.getBounds();

  const request = {
    query: "Night life",
    fields: ["name", "geometry"],
  };

  placesServiceRef.current.nearbySearch(request, handleSearchResults);
};

// Handle search results and retrieve lat/lng of bars
const handleSearchResults = (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    const barLocations = results.map((result) => ({
      lat: result.geometry.location.lat(),
      lng: result.geometry.location.lng(),
    }));

    console.log(barLocations);
  }
};

  return (
    <div ref={mapRef} style={{ height: "90%", width: "100%" }}>
      GoogleMap
    </div>
  );
}
