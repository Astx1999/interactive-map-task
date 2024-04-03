import React, {useContext, useEffect, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, InfoWindow} from '@react-google-maps/api';
import {observer} from "mobx-react-lite";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import {RootStoreContext} from "../../stores/RootStore";
import handleApiPath from "../../utils/handleApiPath";

import {mapColors} from "../../constants/mapColors";
import Select from "react-select";

import styles from './GoogleMap.module.scss'

const containerStyle = {
    width: '100%',
    height: '100vh',
};

const GoogleMapComponent = observer(() => {
    const {listStore: {addItem, setActiveItem, activeItem}} = useContext(RootStoreContext);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState(null);
    const [center, setCenter] = useState({lat: 51.1657, lng: 10.4515});
    const {isLoaded} = useJsApiLoader({googleMapsApiKey: handleApiPath("REACT_APP_GOOGLE_API_KEY"),});

    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);

    const mapOptions = {
        styles: mapColors[currentStyleIndex].style,
    };

    useEffect(() => {
        // calculating active item location and move map to center
        if (activeItem) {
            const distance = Math.sqrt(
                Math.pow(center.lat - activeItem.lat, 2) +
                Math.pow(center.lng - activeItem.lng, 2)
            );
            const threshold = 5;

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
        handleClosePopup();
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setPopupPosition(null);
    };

    const options = mapColors.map((color, index) => ({
        value: index,
        label: color.name
    }));

    return isLoaded ? (
        <div className={styles.root}>

            <div className={styles.select}>
                <Select
                    value={options[currentStyleIndex]}
                    menuPlacement="top"
                    options={options}
                    onChange={(option) => setCurrentStyleIndex(option.value)}/>
            </div>

            <GoogleMap
                options={mapOptions}
                mapContainerClassName={styles.map}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={6}
                onClick={handleMapClick}
            >
                {popupPosition && showPopup && (
                    <InfoWindow position={popupPosition} onCloseClick={handleClosePopup}>
                        <ConfirmModal
                            isOpen={popupPosition && showPopup}
                            question="Do you want to add the location to the list?"
                            handleAddLocation={handleAddLocation}
                            handleClosePopup={handleClosePopup}
                            confirmText={"Add"}
                            rejectText={"Cancel"}
                        />
                    </InfoWindow>
                )}
                {activeItem && <Marker position={activeItem}/>}
            </GoogleMap>
        </div>

    ) : <></>;
});

export default GoogleMapComponent;
