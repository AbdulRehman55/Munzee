import React, { useEffect, useState, useContext } from "react";
import "./styles.scss";
import { PageTitle, Loader } from "../../components";
import MapComponent from "../../components/Map";
import { Container, Box, Typography, Button } from "@mui/material";
import portIcon from "../../assets/images/poiairport.png";
import sportsIcon from "../../assets/images/poisports.png";
import wildLife from "../../assets/images/poiwildlife.png";
import { ClientContext } from "../../context/ClientContext";

const filterIcons = [
  {
    id: "port",
    icon: portIcon,
  },
  {
    id: "sports",
    icon: sportsIcon,
  },
  {
    id: "wildLife",
    icon: wildLife,
  },
];

interface iconBtnsProps {
  id: string;
  icon: string;
  allTypesFilterVal: boolean;
}

const IconButton = ({ id, icon, allTypesFilterVal }: iconBtnsProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log(
      "Current filter status",
      id,
      show
    ); /* DATA TO BE SENT ON BACKEND LATER */
  });

  return (
    <Button
      className={`icon-btn ${show && !allTypesFilterVal ? " show" : ""}`}
      id={id}
      onClick={() => setShow(!show)}
    >
      <img src={icon} alt={id} />
    </Button>
  );
};

type Settings = Readonly<{
  home_latitude?: number;
  home_longitude?: number;
}>;

const PlacesPage = (): JSX.Element => {
  const { client } = useContext(ClientContext);
  const [settings, setSettings] = useState<Settings>();
  const [capturedFilter, setCapturedFilter] = useState(false);
  const [allTypesFilter, setAllTypesFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const getIconBtns = () => {
    return filterIcons.map((item) => {
      return (
        <IconButton
          id={item.id}
          icon={item.icon}
          allTypesFilterVal={allTypesFilter}
        />
      );
    });
  };

  useEffect(() => {
    console.log(
      "Filters status",
      allTypesFilter,
      capturedFilter
    ); /* DATA TO BE SENT ON BACKEND LATER */
  });

  useEffect(() => {
    client?.settings.getSettings().then((result) => {
      setSettings(result);
      setLoading(false);
    });
  }, [client]);

  return (
    <Container id="places-page">
      <PageTitle title="Places Munzees" details="Go cap them again every day" />
      {loading ? <Loader /> :
          <MapComponent
              pos={{
                latitude: +Number(settings?.home_latitude) || 1,
                longitude: +Number(settings?.home_longitude) || 1,
              }}
              zoom={0}
              view={"street"}
              pins={[]}
              onMapBounds={(bounds) => {}}
          />
      }
      <Box className="places-filters">
        <Typography>Filters: </Typography>
        {getIconBtns()}
        <Button
          className="alltypes-btn"
          onClick={() => setAllTypesFilter(!allTypesFilter)}
        >
          All Types
        </Button>
        <Button
          className="captured-btn"
          onClick={() => setCapturedFilter(!capturedFilter)}
        >
          {capturedFilter ? "hide " : "show "} captured and owned
        </Button>
      </Box>
    </Container>
  );
};

export default PlacesPage;
