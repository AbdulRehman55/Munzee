import type { Meta, StoryObj } from "@storybook/react";
import coinsTable from "./index";

const meta = {
  title: "components/CoinsTable",
  component: coinsTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof coinsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CoinTypes: Story = {
  args: {
    columns: ["Type", "Coins"],
    // data: [
    //   {
    //     type: "Munzee Pin ",
    //     logo: "https://munzee.global.ssl.fastly.net/images/coins/munzee.png",
    //     coins: 1,
    //   },
    // ],",
  },
};

export const Coin: Story = {
  args: {
    columns: ["Coin", "Owner"],
    // data: [
    //   {
    //     type: "New Coin By Devzee ",
    //     logo: "https://munzee.global.ssl.fastly.net/images/coins/munzee.png",
    //     ownerName: "Devzee",
    //     ownerLogo:
    //       "https://munzee.global.ssl.fastly.net/images/avatars/ua7pxq.png",
    //   },
    // ],
  },
};
