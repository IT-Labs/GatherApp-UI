// hooks/methods
import { useEffect } from "react";

// libraries
import { Marker, TileLayer, useMap } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";

// types and constants

// styles
import "leaflet/dist/leaflet.css";
import { SMap } from "./styles";

// Placeholder
const icon = L.icon({
  iconUrl: "/images/Placeholder.png",
  iconSize: [20, 20],
});

export const defaultMapPosition: LatLngExpression = [42, 21.432];
// Initial position of the map

type Props = {
  selectedPosition: LatLngExpression;
};

function ResetCenterView({ selectedPosition }: Props) {
  const map = useMap();

  // Setting new view on the map with placeholder on the choosen place
  useEffect(() => {
    map.setView(L.latLng(selectedPosition), map.getZoom(), {
      animate: true,
    });
  }, [map, selectedPosition]);

  return null;
}

function Maps({ selectedPosition }: Props) {
  const urlTileLayer = process.env.REACT_APP_TILE_LAYER_URL;

  return (
    <SMap center={defaultMapPosition} zoom={13} scrollWheelZoom>
      <TileLayer url={urlTileLayer} />
      <Marker position={selectedPosition} icon={icon} />
      <ResetCenterView selectedPosition={selectedPosition} />
    </SMap>
  );
}

export default Maps;

// Optional TileLayer 2: "https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}.png?key=7dn5OQdWEIBAu5BEk0OR"
// Optional Tilelayer 3: "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=7dn5OQdWEIBAu5BEk0OR"
