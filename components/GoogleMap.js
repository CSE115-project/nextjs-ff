import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";
import { Button } from "@mui/joy";

export default function GoogleMap() {
  // Google Maps
  const mapRef = useRef(null);

  // default: San Francisco
  const defLocation = {
    lat: 37.7749,
    lng: -122.4194,
  };

  useEffect(() => {
    // Google Map
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
      version: "weekly",
      libraries: ["places", "visualization"],
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
          mapRef.current = new Map(mapRef.current, {
            center: currentLocation,
            zoom: 13,
          });

          // Add a marker for the user's current location
          new google.maps.Marker({
            position: currentLocation,
            map: mapRef.current,
          });

          // Create Heatmap overlay in nearby area
          const request = {
            location: currentLocation,
            radius: "8000",
            keyword: "restaurants, food, attractions, night life nearby open now",
          };

          let service = new google.maps.places.PlacesService(mapRef.current);
          service.nearbySearch(request, nearbyResults);
        });
      } else {
        // Create a new map centered on the default location
        mapRef.current = new Map(mapRef.current, {
          center: { lat: defLocation.lat, lng: defLocation.lng },
          zoom: 13,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nearby results: place markers, heatmap
  function nearbyResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("Results:", results);
      getHeatmapData(results);
      for (let result of results) {
        createMarker(result);
      }
    }
  }

  // Create marker for place
  function createMarker(place) {
    new google.maps.Marker({
      position: place.geometry.location,
      map: mapRef.current,
    });
  }

  // Add Nearby Results locations for heatmap
  function getHeatmapData(results) {
    const data = results.map((result) => {
      const lat = result.geometry.location.lat();
      const lng = result.geometry.location.lng();

      return ({ 
        location: new google.maps.LatLng(lat,lng),
        weight: Math.random() * 10, // You can set the weight based on your data
      })
    });

    if (mapRef.current) {
      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: data,
      });

      heatmap.setMap(mapRef.current);
    }
  }

  return (
    <div ref={mapRef} style={{ height: "90%", width: "100%" }}>
      <Button loading loadingPosition="start">
        Loading...
      </Button>
    </div>
  );
}
