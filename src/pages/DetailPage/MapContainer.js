import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const LoadingContainer = (props) => <div>Fancy loading container!</div>;
const containerStyle = {
  position: "relative",
  width: "100%",
  height: "300px",
};

const MapContainer = (props) => {
  // 위도 경도 props로 받을 예정
  //   const [location, setLocation] = useState({});
  return (
    <>
      <Map
        google={props.google}
        zoom={14}
        containerStyle={containerStyle}
        initialCenter={{ lat: 37.505834, lng: 127.050149 }}
      >
        <Marker onClick={props.onMarkerClick} name={"Current location"} />
        <InfoWindow onClose={props.onInfoWindowClose}>
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
