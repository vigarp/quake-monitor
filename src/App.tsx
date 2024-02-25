import "@mantine/core/styles.css";
import {
  MantineProvider,
  Container,
  Stack,
  Skeleton,
  Table,
  Checkbox,
  Title,
  Center,
  Text
} from "@mantine/core";
import { theme } from "./theme";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { getFeltQuake } from "./store/slice";
import { useEffect, useState } from "react";

export default function App() {
  const [allQuakesData, setaAllQuakesData] = useState<any[]>([]);
  const [allQuakesMarker, setAllQuakesMarker] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const { data: quakesData, isLoading } = useQuery({
    queryKey: ["quake"],
    queryFn: getFeltQuake,
  });

  useEffect(() => {
    if (quakesData && selectedRows.length === 0) {
      const quakes = quakesData.Infogempa.gempa.map((data: any) => ({
        ...data,
        Coordinates: manipulateQuakesData(data.Coordinates),
      }));
      setaAllQuakesData(quakes);
      setAllQuakesMarker(quakes);
    }
  }, [quakesData, selectedRows]);

  const manipulateQuakesData = (coordinates: any) => {
    const [lat, lng] = coordinates
      .split(",")
      .map((coord: string) => parseFloat(coord));
    return { lat, lng };
  };

  useEffect(() => {
     const quakes = quakesData?.Infogempa?.gempa?.map((data: any) => ({
        ...data,
        Coordinates: manipulateQuakesData(data.Coordinates),
      }));

    if (selectedRows.length > 0) {
      const result = selectedRows.map(index => quakes[index]);
      setAllQuakesMarker(result);
    }
  }, [quakesData, selectedRows])

  const rows = allQuakesData.map((element, idx) => (
    <Table.Tr key={idx} bg={selectedRows.includes(idx) ? 'var(--mantine-color-blue-light)' : undefined}>
       <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(idx)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, idx]
                : selectedRows.filter((position) => position !== idx)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.Tanggal}</Table.Td>
      <Table.Td>{element.Jam}</Table.Td>
      <Table.Td>{element.Wilayah}</Table.Td>
      <Table.Td>{element.Dirasakan}</Table.Td>
      <Table.Td>{element.Magnitude}</Table.Td>
      <Table.Td>{element.Kedalaman}</Table.Td>
    </Table.Tr>
  ));

  const getYear = () => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    return year;
  }

  return (
    <MantineProvider theme={theme}>
      <Container mt="lg">
        <Center>
          <Title order={3} my="lg">Peta Daftar 15 Gempabumi Dirasakan</Title>
        </Center>
        <div id="map">
          {isLoading ? (
            <Stack p="10">
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
              <Skeleton height="40px" />
            </Stack>
          ) : (
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

              {allQuakesMarker.map((position, idx) => (
                <Marker
                  position={{
                    lat: position.Coordinates.lat,
                    lng: position.Coordinates.lng,
                  }}
                  key={idx}
                >
                  <Popup>{position.Wilayah}</Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          <section>
          <Table.ScrollContainer minWidth={500}>
            <Table withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>Tanggal</Table.Th>
                  <Table.Th>Jam</Table.Th>
                  <Table.Th>Wilayah</Table.Th>
                  <Table.Th>Dirasakan</Table.Th>
                  <Table.Th>Magnitude</Table.Th>
                  <Table.Th>Kedalaman</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          </section>

          <footer>
            <Center py="sm">
             <Text c="blue" component="a" href="https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json" target="_blank">BMKG</Text>
            </Center>
            <Center py="md">
             <Text c="dimmed" component="a" href="https://github.com/vigarp" target="_blank">vigarp - {getYear()}</Text>
            </Center>
          </footer>
        </div>
      </Container>
    </MantineProvider>
  );
}
