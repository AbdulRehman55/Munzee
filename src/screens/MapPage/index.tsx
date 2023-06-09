import React from "react";
import "./styles.scss";
import MapComponent, { Pin } from "../../components/Map";
import { Box } from "@mui/material";
import MapGreenButton from "./MapGreenButton";
import { ClientContext } from "../../context/ClientContext";
import  { Loader } from "../../components";

const MapPage = (): JSX.Element => {
  const { client } = React.useContext(ClientContext);

  const [view, setView] = React.useState<"street" | "satellite">("street");
  const [loading, setLoading] = React.useState(true);

  const [pins, setPins] = React.useState<ReadonlyArray<Pin>>([]);
  React.useEffect(() => {
    client?.map.onPins(setPins);
  }, [client?.map, setPins]);

  const [initialPos, setInitialPos] = React.useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 1, longitude: 1 });
  React.useEffect(() => {
    getLocation()
      .then((pos) => {
          setInitialPos(pos.coords);
          setLoading(false);
      })
      .catch(() => {});
  }, []);

  const [activeButtons, setActiveButtons] = React.useState<
    ReadonlyArray<
      Readonly<{
        id: string;
        title: string;
        isActive: boolean;
      }>
    >
  >([]);

  React.useEffect(() => {
    const filters = client?.map.getFilterArray() || [];
    setActiveButtons(
      filters.map((f) => ({
        ...f,
        title: f.id,
      }))
    );
  }, [client]);

  const footerPanelItems = React.useMemo(() => {
    return activeButtons.map((item) => {
      return (
        <MapGreenButton
          id={item.id}
          title={item.title}
          isActive={item.isActive}
          onClick={() => {
            setActiveButtons(
              activeButtons.map((b) => ({
                ...b,
                isActive: b.id !== item.id ? b.isActive : !b.isActive,
              }))
            );
            const updated: { [id: string]: boolean } = {};
            updated[item.id] = !item.isActive;
            client?.map.setFilters(updated);
          }}
        />
      );
    });
  }, [activeButtons]);

  return (
    <Box id="map-page">
      <div className="map-wrapper">
          {
              loading ? <Loader /> :
                  <MapComponent
                      pos={initialPos}
                      zoom={16}
                      view={view}
                      pins={pins}
                      onMapBounds={client?.map.setBounds || (() => {})}
                  />
          }
        <div className="map-navigation">
          <div className="search"></div>
          <div className="btns"></div>
        </div>
      </div>
      <div className="map-footer-panel">{footerPanelItems}</div>
    </Box>
  );
};
export default MapPage;

function getLocation(): Promise<{
  coords: {
    latitude: number;
    longitude: number;
  };
}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject();
    } else {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 30000,
      });
    }
  });
}
