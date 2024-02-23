import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import { useEffect, useState } from "react";

const gempa = [
  { id: 1, coordinates: {lat: 2.95, lng: 119.37}, location: "Mamasa" },
  { id: 2, coordinates: {lat: -8.05, lng: 107.74}, location: "Tasikmalaya" },
  { id: 3, coordinates: {lat: -8.35, lng: 116.46}, location: "Lombok Utara" },
  { id: 4, coordinates: {lat: -2.56, lng: 140.65}, location: "Jayapura" },
  { id: 5, coordinates: {lat: -8.20, lng: 108.44}, location: "Pangandaran" },
];

export default function App() {
  // const [latLng, setLatLng] = useState([[51.505, -0.09]]);

  // const addMap = () => {
  //   setLatLng([...latLng, [39.312, -0.092]]);
  // };

  return (
    <MantineProvider theme={theme}>
      <div id="map">
        <MapContainer
          center={[-4.281, 116.895]}
          zoom={4}
          // scrollWheelZoom={false}
          style={{ height: "50vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {gempa.map((position, idx) => (
            <Marker position={{ lat: position.coordinates.lat, lng: position.coordinates.lng }} key={idx}>
              <Popup>{position.location}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <section>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
            soluta? Nihil error dignissimos atque reprehenderit asperiores, at
            quas corrupti odit enim, unde minima corporis qui architecto,
            cupiditate provident adipisci eius.
          </p>
        </section>
      </div>
    </MantineProvider>
  );
}
