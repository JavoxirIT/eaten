import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import icon from "./constants";

const SetViewToCurrentLocation = ({ location, setLocation }) => {
  const map = useMap();

  const getGeo = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(
          "--------- ERROR WHILE FETCHING LOCATION ----------- ",
          error
        );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, [setLocation]);

  useEffect(() => {
    getGeo();
  }, [getGeo]);

  useEffect(() => {
    if (location.lat && location.lng) {
      map.setView([location.lat, location.lng]);
    }
  }, [location, map]);

  return null;
};

function LocationMarker({ location, setLocation }) {
  let lat = location.lat;
  let lng = location.lng;
  const [positions, setPositions] = useState(null);
  useEffect(() => {
    setPositions({ lat, lng });
  }, [lat, lng]);

  const [bbox, setBbox] = useState([]);

  //   useEffect(() => {
  //     setLocation(bbox);
  //   }, [bbox, setLocation]);

  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPositions(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng);
      circle.addTo(map, radius);
      setBbox(e.bounds.toBBoxString().split(","));
    });
  }, [map]);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          console.log(
            "+++++++++++ THE OUTPUT OF getLatLng IS ++++++++++++ ",
            marker.getLatLng()
          );
          setPositions(marker.getLatLng());
        }
      },
    }),
    []
  );

  return positions === null ||
    positions.lat === undefined ||
    positions.lng === undefined ? null : (
    <Marker
      position={[positions.lat, positions.lng]}
      icon={icon}
      eventHandlers={eventHandlers}
    >
      <Popup>
        Siz turgan joy <br />
        Xarita bbox: <br />
        <b>Janubi-g'arbiy lng</b>: {bbox[0]} <br />
        <b>Janubi-g'arbiy lat</b>: {bbox[1]} <br />
        <b>Shimoli-sharqiy lng</b>: {bbox[2]} <br />
        <b>Shimoli-sharqiy lat</b>: {bbox[3]}
      </Popup>
    </Marker>
  );
}
function MyComponent({ setLocation }) {
  const map = useMapEvents({
    click: () => {
      map.on("click", function (e) {
        var coord = e.latlng;
        let lat = coord.lat;
        let lng = coord.lng;
        setLocation({ lat, lng });
      });
    },
  });
  return null;
}
export function MyMapComponent({ setDataLocation }) {
  const [location, setLocation] = useState({});
  useEffect(() => {
    setDataLocation(location);
    console.log("location", location);
  }, [location, setDataLocation]);
  const position =
    location !== null &&
    location.lat !== undefined &&
    location.lng !== undefined
      ? [location.lat, location.lng]
      : [0, 0];
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SetViewToCurrentLocation location={location} setLocation={setLocation} />
      <LocationMarker location={location} setLocation={setLocation} />
      <MyComponent setLocation={setLocation} />
    </MapContainer>
  );
}
