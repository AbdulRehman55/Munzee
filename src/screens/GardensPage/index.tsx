import React, { useEffect, useState, useContext } from "react";
import { Container } from "@mui/material";
import { PageTitle, MapComponent } from "../../components";
import { ClientContext } from "../../context/ClientContext";
import { Munzee } from "../../munzee-backend/types";
import { Pin } from "../../components/Map";
import "./styles.scss";

const GardensPage = (): JSX.Element => {
  const { backend, user } = useContext(ClientContext);
  const [data, setData] = useState<Munzee>();

  useEffect(() => {
    if (user) {
      const gardensData = async () => {
        var result = await backend?.munzee.getGardensData({
          user_id: user?.userId ?? 0,
        });
        setData(result);
      };
      gardensData();
    }
  }, [user]);

  const pins: Pin[] = Object.values(data || {}).map(
    (item: Munzee, index: number) => ({
      id: index.toString() || "",
      latitude: item.latitude || "",
      longitude: item.longitude || "",
      imageUrl:
        "https://munzee.global.ssl.fastly.net/images/pins/virtualemerald.png",
    })
  );
  const calculateCenterPosition = (pins: Pin[]) => {
    const validPins = pins.filter((pin) => {
      const latitude = parseFloat(pin.latitude.toString());
      const longitude = parseFloat(pin.longitude.toString());
      return !isNaN(latitude) && !isNaN(longitude);
    });
  
    if (validPins.length === 0) {
      return null; // Return null if there are no valid pins
    }
  
    const centerLatitude = validPins.reduce(
      (sum, pin) => sum + parseFloat(pin.latitude.toString()),
      0
    ) / validPins.length;
  
    const centerLongitude = validPins.reduce(
      (sum, pin) => sum + parseFloat(pin.longitude.toString()),
      0
    ) / validPins.length;
  
    return { latitude: centerLatitude, longitude: centerLongitude };
  };
  

  const centerPosition = calculateCenterPosition(pins) || {
    latitude: 1,
    longitude: 1,
  };
  return (
    <Container id="gardens-page">
      <PageTitle
        title="Munzee Gardens"
        details="Go around the world and visit all the official Munzee gardens."
      />
      <MapComponent
        pos={centerPosition}
        zoom={0}
        view={"street"}
        pins={pins}
        onMapBounds={(bounds) => {}}
      />
    </Container>
  );
};

export default GardensPage;
