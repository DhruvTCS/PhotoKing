import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;

const mapContainerStyle = {
    height: '400px',
    width: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523,
};

interface LocationPickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (locationString: string) => void;
}

const LocationPickerModal: React.FC<LocationPickerModalProps> = ({ isOpen, onClose, onSelect }) => {
    const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [inputValue, setInputValue] = useState('');

    const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
            setSelectedPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
            setInputValue(''); // Clear input value when manually selecting on map
        }
    }, []);

    const onLoadAutocomplete = (autocompleteInstance: google.maps.places.Autocomplete) => {
        setAutocomplete(autocompleteInstance);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            if (place.geometry) {
                const lat = place.geometry.location?.lat();
                const lng = place.geometry.location?.lng();
                if (lat && lng) {
                    setSelectedPosition({ lat, lng });
                    setInputValue(place.formatted_address || '');
                }
            }
        }
    };

    const handleSelectLocation = () => {
        if (selectedPosition) {
            const locationString = `${selectedPosition.lat}, ${selectedPosition.lng}`;
            onSelect(locationString);
        }
    };

    return (
        isOpen ? (
            <ModalContainer>
                <h2>Select Location</h2>
                <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
                    <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                        <Input
                            type="text"
                            placeholder="Search location"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Autocomplete>
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={selectedPosition || center}
                        zoom={10}
                        onClick={handleMapClick}
                    >
                        {selectedPosition && <Marker position={selectedPosition} />}
                    </GoogleMap>
                </LoadScript>
                <Button onClick={handleSelectLocation}>Select Location</Button>
                <Button onClick={onClose}>Close</Button>
            </ModalContainer>
        ) : null
    );
};

export default LocationPickerModal;
