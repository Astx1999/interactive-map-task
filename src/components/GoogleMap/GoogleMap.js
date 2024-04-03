import React, {useContext, useEffect, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, InfoWindow} from '@react-google-maps/api';
import handleApiPath from "../../utils/handleApiPath";
import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../stores/RootStore";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from './GoogleMap.module.scss'


const containerStyle = {
    width: '100%',
    height: '100vh',
};

const GoogleMapComponent = observer(() => {
    const {
        listStore: {
            addItem,
            setActiveItem,
            activeItem
        }
    } = useContext(RootStoreContext)

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: handleApiPath("REACT_APP_GOOGLE_API_KEY"),
    });

    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState(null);
    const [center, setCenter] = useState({
        lat: 51.1657,
        lng: 10.4515,
    });

    useEffect(() => {
        if (activeItem) {
            // Calculate the distance between the current center and the active item
            const distance = Math.sqrt(
                Math.pow(center.lat - activeItem.lat, 2) +
                Math.pow(center.lng - activeItem.lng, 2)
            );

            // Define a threshold distance (in degrees) for center update
            const threshold = 5; // Increase the threshold value for a bigger range

            // Only update the center if the active item is outside the threshold range
            if (distance > threshold) {
                setCenter(activeItem);
            }
        }

    }, [activeItem, center]);


    const handleMapClick = (event) => {
        setShowPopup(true);
        setPopupPosition({lat: event.latLng.lat(), lng: event.latLng.lng()});
    };

    const handleAddLocation = () => {
        const newItem = {
            lat: popupPosition.lat,
            lng: popupPosition.lng
        };

        addItem(newItem);
        setActiveItem(newItem);
        handleClosePopup()
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupPosition(null)
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={styles.map}
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
            onClick={handleMapClick}

        >
            {popupPosition && showPopup && (
                <InfoWindow
                    position={{lat: popupPosition.lat, lng: popupPosition.lng}}
                    onCloseClick={handleClosePopup}
                >
                    <ConfirmModal
                        question="Do you want to add the location to the list?"
                        handleAddLocation={handleAddLocation}
                        handleClosePopup={handleClosePopup}
                    />
                </InfoWindow>
            )}
            {activeItem && <Marker position={activeItem}/>}
        </GoogleMap>
    ) : <></>;
});

export default GoogleMapComponent;
