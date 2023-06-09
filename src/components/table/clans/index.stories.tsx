import type { Meta, StoryObj } from "@storybook/react";
import clansTable from "./index";

const meta = {
  title: "components/ClansTable",
  component: clansTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof clansTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Clan Leaderboards",
    columns: ["Rank", "Logo", "Clan", "Total Points", "Level"],
    data: [
      {
        rank: "#1",
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/clan_logos/2ho.png",
        name: "A Bee Zee",
        totalPoints: "Total Points",
        levelReached: "1",
      },
      {
        rank: "#1",
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/clan_logos/2ho.png",
        name: "A Bee Zee",
        totalPoints: "Total Points",
        levelReached: "1",
      },
    ],
  },
};
