import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Container } from "reactstrap";
import MarkIcon from "../assets/Iconos/pin.png";
import L from "leaflet";

const Mapa = ({ ubicacion, setUbicacion }) => {
  const [coordenadas, setCoordendas] = useState({
    lat: 19.4324454,
    lng: -99.1330281,
  });
  const coordenada = async (e) => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setCoordendas({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    coordenada();
  }, []);

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
  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        setUbicacion(e.target.getLatLng());
      },
    }),
    []
  );

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <Container>
      <MapContainer
        style={{ height: "300px", width: "100%" }}
        center={coordenadas}
        zoom={17}
        scrollWheelZoom={false}
      >
        <ChangeView center={coordenadas} zoom={17} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable
          eventHandlers={eventHandlers}
          icon={IconMarkers}
          position={coordenadas}
        >
          <Popup>Nueva Ubicacion</Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default Mapa;
