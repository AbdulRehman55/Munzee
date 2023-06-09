import type { Meta, StoryObj } from "@storybook/react";
import Section, { Data } from "./index";

const meta = {
  title: "components/Section",
  component: Section,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

const data: Data[] = [
  {
    iconName: "RCR's BeeKeeper Social",
    iconImg: "https://munzee.global.ssl.fastly.net/images/pins/social.png",
    captureMonth: "6",
    iconLink: "/m/RedCarRobbie/12/",
    points: 0,
    userName: "RedCarRobbie",
    avatar: "https://munzee.global.ssl.fastly.net/images/avatars/ua4lir.png",
    userLink: "/m/RedCarRobbie/",
    deployedYear: "7",
  },
  {
    iconName: "RCR's BeeKeeper Social",
    iconImg: "https://munzee.global.ssl.fastly.net/images/pins/social.png",
    captureMonth: "6",
    iconLink: "/m/RedCarRobbie/12/",
    points: 0,
    userName: "RedCarRobbie",
    avatar: "https://munzee.global.ssl.fastly.net/images/avatars/ua4lir.png",
    userLink: "/m/RedCarRobbie/",
    deployedYear: "7",
  },
];

export const Default: Story = {
  args: {
    key: 1,
    item: data[0],
    iconSubText: "capture 10 months ago",
    userSubText: "deployed 10 months ago",
  },
};
