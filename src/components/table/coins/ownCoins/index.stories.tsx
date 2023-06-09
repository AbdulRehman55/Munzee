import type { Meta, StoryObj } from "@storybook/react";
import OwnCoinsTable from "./index";

const meta = {
  title: "components/OwnCoinsTable",
  component: OwnCoinsTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof OwnCoinsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: ["Coin", "Type", "Code", "Munzees Visited"],
    // data: [
    //   {
    //     userInfo: {
    //       name: "New Coin",
    //       createdBy: "Devzee",
    //       image: "https://munzee.global.ssl.fastly.net/images/coins/munzee.png",
    //     },
    //     type: "Munzee pin",
    //     code: "5TS9D9",
    //     totalVisited: "1,488",
    //   },
    // ],
  },
};

export const WithIcons: Story = {
  args: {
    icons: true,
    columns: ["Coin", "Player", "Discovered"],
    // data: [
    //   {
    //     userInfo: {
    //       name: "New Coin",
    //       createdBy: "Devzee",
    //       image: "https://munzee.global.ssl.fastly.net/images/coins/munzee.png",
    //     },
    //     playerInfo: {
    //       name: "Krikat",
    //       image: "https://munzee.global.ssl.fastly.net/images/coins/munzee.png",
    //     },
    //     discovered: "4 years ago",
    //   },
    // ],
  },
};
