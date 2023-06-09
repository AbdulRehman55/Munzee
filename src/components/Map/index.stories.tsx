import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Map from "./index";

const meta = {
  title: "components/Map",
  component: Map,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Map>;

export default meta;
type Story = StoryObj<typeof meta>;

const pins = [
  {
    id: "38010796",
    latitude: "36.60608",
    longitude: "-121.895801",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 50,
  },
  {
    id: "38011200",
    latitude: "36.605985",
    longitude: "-121.89568",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 50,
  },
  {
    id: "38010793",
    latitude: "36.606003",
    longitude: "-121.89563",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 150,
  },
  {
    id: "38010795",
    latitude: "36.606072",
    longitude: "-121.89532",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 120,
  },
  {
    id: "38010797",
    latitude: "36.606244",
    longitude: "-121.89527",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
  },
  {
    id: "38011250",
    latitude: "36.604786",
    longitude: "-121.89427",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
  },
  {
    id: "16730678",
    latitude: "36.60572947200662",
    longitude: "-121.89452189952138",
    imageUrl: "https://munzee.global.ssl.fastly.net/images/pins/charmbox.png",
  },
  {
    id: "19680033",
    latitude: "36.606177598033426",
    longitude: "-121.89435895532371",
    imageUrl: "https://munzee.global.ssl.fastly.net/images/pins/greenie.png",
  },
  {
    id: "38008650",
    latitude: "36.60465477",
    longitude: "-121.8926574",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 30,
  },
  {
    id: "183796567",
    latitude: "36.604866547283",
    longitude: "-121.89258578066",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/nightvisiongoggles.png",
  },
  {
    id: "21249192",
    latitude: "36.60533140472182",
    longitude: "-121.8924519047141",
    imageUrl: "https://munzee.global.ssl.fastly.net/images/pins/greenie.png",
    circle: 200,
  },
  {
    id: "38010791",
    latitude: "36.603911",
    longitude: "-121.89512",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
  },
  {
    id: "38010792",
    latitude: "36.604366",
    longitude: "-121.89532",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 50,
  },
  {
    id: "38010790",
    latitude: "36.603874",
    longitude: "-121.89496",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
  },
  {
    id: "38010789",
    latitude: "36.603854",
    longitude: "-121.89483",
    imageUrl:
      "https://munzee.global.ssl.fastly.net/images/pins/cahistoricallocation.png",
    circle: 75,
  },
];

const defaultArgs: React.ComponentProps<typeof Map> = {
  pos: { latitude: 36.603854, longitude: -121.89483 },
  zoom: 16,
  view: "street",
  pins,
  onMapBounds: (bounds: {
    north: number;
    east: number;
    south: number;
    west: number;
  }) => {},
};

export const StreetView: Story = {
  args: { ...defaultArgs, view: "street" },
};

export const SatelliteView: Story = {
  args: { ...defaultArgs, view: "satellite" },
};
