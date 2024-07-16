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
  padding: 10px;
  @media (max-width: 480px) {
    
    padding: 0px;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  height: 100%;
  max-height: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 85%;
    max-height: 80%;
  }

  @media (max-width: 480px) {
    max-width: 80%;
    max-height: 90%;
    padding: 15px;
  }
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const SubmitButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 10px;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const CancelButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 8px;
    font-size: 14px;
  }
`;

const SubmitContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const mapContainerStyle = {
  height: '100%',
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
    // if (selectedPosition) {
    //     const locationString = `${selectedPosition.lat}, ${selectedPosition.lng}`;
    //     onSelect(locationString);
    // }
    onSelect(inputValue);
    console.log(inputValue)
  };

  return (
    isOpen ? (
      <Modal>
        <ModalContainer>
          <h2>Select Location</h2>
          {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" libraries={['places']}>
                        <Autocomplete onLoad={onLoadAutocomplete} onPlaceChanged={onPlaceChanged}>
                            <Input
                                type="text"
                                placeholder="Search location"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </Autocomplete>
                        <MapContainer>
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                center={selectedPosition || center}
                                zoom={10}
                                onClick={handleMapClick}
                            >
                                {selectedPosition && <Marker position={selectedPosition} />}
                            </GoogleMap>
                        </MapContainer>
                    </LoadScript> */}

          <input type="text" placeholder="EnterLocation" onChange={(e) => setInputValue(e.target.value)} />
          <SubmitContainer>
            <SubmitButton onClick={() => handleSelectLocation()}>Select Location</SubmitButton>
            <CancelButton onClick={onClose}>Close</CancelButton>
          </SubmitContainer>
        </ModalContainer>
      </Modal>
    ) : null
  );
};

export default LocationPickerModal;
