import { Button } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import icon from "./constants";

const SetViewToCurrentLocation = ({ location, setLocation }) => {
  const map = useMap();

  function getGeo() {
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
  }

  useEffect(() => {
    getGeo();
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      map.setView([location.lat, location.lng]);
    }
  }, [location]);

  return null;
};

const CustomizeMarker = ({ location, setLocation }) => {
  const [draggable, setDraggable] = useState(false);
  //   console.log(
  //     "*************** THE INPUT LOCATION IS ***************** ",
  //     location
  //   );
  let lat = location.lat;
  let lng = location.lng;
  const [position, setPosition] = useState({ lat, lng });
  //   console.log(
  //     "-----------------THE POS VALUE IS ------------------- ",
  //     position
  //   );
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
          setPosition(marker.getLatLng());
          setDraggable(false);
        }
      },
    }),
    []
  );

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  const saveLocation = () => {
    if (markerRef.current)
      console.log(
        "+++++++++++ THE OUTPUT OF getLatLng IS ++++++++++++ ",
        markerRef.current.getLatLng()
      );
  };
  return (
    <>
      <Marker
        icon={icon}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={[position.lat, position.lng]}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <Button onClick={saveLocation}>Submit</Button>
        </Popup>
      </Marker>
      <Button
        onClick={toggleDraggable}
        variant="contained"
        className="edit-location-button"
      >
        Edit Your Location
      </Button>
    </>
  );
};
const EditHome = () => {
  const [location, setLocation] = useState({});

  return (
    <form>
      <div>
        <div className="map-container">
          <MapContainer center={[0, 0]} zoom={16} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <GeoSearchField /> */}
            <SetViewToCurrentLocation
              location={location}
              setLocation={setLocation}
            />
            {location.lat && location.lng && (
              <CustomizeMarker location={location} setLocation={setLocation} />
            )}
          </MapContainer>
        </div>
      </div>
    </form>
  );
};

export default EditHome;
