import GoogleMapReact from 'google-map-react';

export default function Map() {
    let center = {lat: 37.7749, lng: -122.4194}; // San Francisco default
    let zoom = 11;
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API }}
                defaultCenter={center}
                defaultZoom={zoom}
            ></GoogleMapReact>
        </div>
    );
};

