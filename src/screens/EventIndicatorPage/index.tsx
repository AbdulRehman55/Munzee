import React from "react";
import EventIndicator from "../EventIndicator";
import { mockData, panelItemsData } from "./mockData";

const EventIndicatorPage = ():JSX.Element => {
  return <EventIndicator daysActivityData={mockData} leftPanelItemsData={panelItemsData} rightPanelItemsData={panelItemsData}/>
};

export default EventIndicatorPage;