import type { Meta, StoryObj } from "@storybook/react";
import leaderboardTable from "./index";

const meta = {
  title: "components/LeaderboardTable",
  component: leaderboardTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof leaderboardTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/avatars/ua578f.png",
        username: "Belboz",
        score: "119,008",
        rank: "#1",
      },
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/avatars/ua578f.png",
        username: "Belboz",
        score: "119,008",
        rank: "#2",
      },
    ],
    title: "yesterday",
  },
};
export const WithIcon: Story = {
  args: {
    data: [
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/avatars/ua578f.png",
        username: "Belboz",
        score: "119,008",
        rank: "#1",
      },
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/avatars/ua578f.png",
        username: "Belboz",
        score: "119,008",
        rank: "#2",
      },
    ],
    title: "yesterday",
    showIcon: true,
  },
};
