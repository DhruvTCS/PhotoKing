import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

const Modal = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
justify-content: center;
position: fixed;
top: 0;
left: 0;
z-index: 1000;
background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  display: flex;
  width: 600px;
  height: 700px;
  background-color:white;
  flex-direction: column;
  padding: 20px;
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const CancleButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
`;
const SubmitConatiner = styled.div`
width: 100%;
display:flex;
align-items: center;
justify-content: center;
`;
const MapConatiner = styled.div`
    height: 400px;
    width:100%;
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
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            setSelectedPosition({ lat, lng });

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    setInputValue(results[0].formatted_address);
                } else {
                    setInputValue('Location not found');
                }
            });
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
            <Modal>

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
                        <MapConatiner>

                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={selectedPosition || center}
                                zoom={10}
                                onClick={handleMapClick}
                            >
                                {selectedPosition && <Marker position={selectedPosition} />}
                            </GoogleMap>
                        </MapConatiner>
                    </LoadScript>
                    <SubmitConatiner>

                        <SubmitButton onClick={handleSelectLocation}>Select Location</SubmitButton>
                        <CancleButton onClick={onClose}>Close</CancleButton>
                    </SubmitConatiner>
                </ModalContainer>
            </Modal>
        ) : null
    );
};

export default LocationPickerModal;
