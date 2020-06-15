import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "300px",
};

const MapContainer = (props) => {
  console.log("props 확인", props && props.lat);

  return (
    <>
      {props.lat && (
        <Map
          google={props.google}
          zoom={14}
          containerStyle={containerStyle}
          initialCenter={{
            lat: Number(props.lat),
            lng: Number(props.lng),
          }}
        >
          <Marker onClick={props.onMarkerClick} name={"Current location"} />
          <InfoWindow onClose={props.onInfoWindowClose}>
            <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
          </InfoWindow>
        </Map>
      )}
    </>
  );
};

export default GoogleApiWrapper((props) => ({
  apiKey: "AIzaSyDj7jrAczzY8BsJsvkzYOPKVTHQADjMqzw",
  LoadingContainer: LoadingContainer,
}))(MapContainer);
