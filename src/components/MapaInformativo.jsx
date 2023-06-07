import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "reactstrap";
import MarkIcon from "../assets/Iconos/pin.png";
import L from "leaflet";

const MapaInformativo = ({ lat, lng }) => {
  const IconMarkers = L.icon({
    iconUrl: MarkIcon,
    iconRetinaUrl: MarkIcon,
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });

  return (
    <Container>
      <MapContainer
        style={{ height: "300px", width: "100%" }}
        center={{ lat, lng }}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker draggable icon={IconMarkers} position={{ lat, lng }}>
          <Popup>Nueva Ubicacion</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default MapaInformativo;
