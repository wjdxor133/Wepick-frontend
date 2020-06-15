import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "300px",
};

const MapContainer = (props) => {
  return (
    <>
      <Map
        google={props && props.google}
        zoom={14}
        containerStyle={containerStyle}
        initialCenter={{
          lat: Number(props && props.lat),
          lng: Number(props && props.lng),
        }}
      >
        <Marker
          onClick={props && props.onMarkerClick}
          name={"Current location"}
        />
        <InfoWindow onClose={props && props.onInfoWindowClose}>
          <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    </>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: "AIzaSyDj7jrAczzY8BsJsvkzYOPKVTHQADjMqzw",
  LoadingContainer: LoadingContainer,
}))(MapContainer);
