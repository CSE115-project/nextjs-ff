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

          const request = {
            query: "Night life",
            fields: ["name", "geometry"],
          };
  
          // Perform search and get bars within the current map view
          const result = performSearch(request, map);
          console.log(result);

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
  const performSearch = (request, map) => {
    if (!mapRef.current) return;

    // Initialize PlacesService
    let service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(
      request,
      (
        results,
        status,
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }

          map.setCenter(results[0].geometry.location);
        }
      }
    );
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
