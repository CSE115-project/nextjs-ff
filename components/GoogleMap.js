import { Loader } from "@googlemaps/js-api-loader";
import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/joy";

export default function GoogleMap() {
  const mapRef = useRef(null);
  const [heatMapData, setHeatMapData] = useState([]);

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
            keyword: "food, attractions, night life nearby open now",
          };

          let service = new google.maps.places.PlacesService(mapRef.current);
          service.nearbySearch(request, nearbyResults);

          // if (heatMapData.length > 0 && mapRef.current) {
          //   const heatmap = new google.maps.visualization.HeatmapLayer({
          //     data: heatMapData,
          //     map: mapRef.current,
          //   });
          //   return () => {
          //     heatmap.setMap(null); // Cleanup when component unmounts
          //   };
          // }
        });
      } else {
        mapRef.current = new Map(mapRef.current, {
          center: { lat: defLocation.lat, lng: defLocation.lng },
          zoom: 13,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function nearbyResults(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log("Results:", results);
      getHeatmapData(results);
      for (let result of results) {
        createMarker(result);
      }
    }
  }

  function createMarker(place) {
    new google.maps.Marker({
      position: place.geometry.location,
      map: mapRef.current,
    });
  }

  function getHeatmapData(results) {
    const data = results.map((result) => ({
      location: new google.maps.LatLng(
        result.geometry.location.lat(),
        result.geometry.location.lng()
      ),
      weight: Math.random() * 10, // You can set the weight based on your data
    }));

    console.log("data:", data);
    setHeatMapData(data);
  }

  return (
    <div ref={mapRef} style={{ height: "90%", width: "100%" }}>
      <Button loading loadingPosition="start">
        Loading...
      </Button>
    </div>
  );
}
