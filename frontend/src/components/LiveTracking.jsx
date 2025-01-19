import React, { useState, useEffect } from 'react';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);

    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                },
                { enableHighAccuracy: true }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({
                        lat: latitude,
                        lng: longitude,
                    });
                    console.log('Position updated:', latitude, longitude);
                },
                (error) => {
                    console.error('Error updating position:', error);
                }
            );
        };

        const intervalId = setInterval(updatePosition, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        // Assuming GoMaps.Pro requires initializing the map
        const map = new GoMaps.Map({
            container: 'map', // The ID of your map container div
            center: currentPosition,
            zoom: 15,
        });

        // Marker setup
        const marker = new GoMaps.Marker({
            position: currentPosition,
            map: map,
        });

        return () => {
            map.destroy(); // Clean up the map on component unmount
        };
    }, [currentPosition]);

    return <div id="map" style={containerStyle}></div>;
};

export default LiveTracking;
