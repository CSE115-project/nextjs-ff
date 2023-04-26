import { useState } from 'react';
import GoogleMapReact from 'google-map-react';

export function Map({ center, zoom }) {

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.googleMapsAPIkey }}
                defaultCenter={center}
                defaultZoom={zoom}
            ></GoogleMapReact>
        </div>
    );
};

