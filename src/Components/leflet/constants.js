import L from "leaflet";
import shadow from "../../dist/images/marker-shadow.png";
import marker from "../../dist/images/marker-icon.png";
export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: marker,
  shadowUrl: shadow,
});
