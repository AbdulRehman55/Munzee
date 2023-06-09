import React from "react";
import "./styles.scss";
import { Container } from "@mui/material";
import { PageTitle, MapComponent } from "../../components";

const EventIndicatorMap = (): JSX.Element => {
  return (
    <Container id="event-indicator-map">
      <PageTitle title="EventIndicator's Deployments Map" />
      <MapComponent
        pos={{ latitude: 1, longitude: 1 }}
        zoom={0}
        view={"street"}
        pins={[]}
        onMapBounds={(bounds) => {}}
      />
    </Container>
  );
};

export default EventIndicatorMap;