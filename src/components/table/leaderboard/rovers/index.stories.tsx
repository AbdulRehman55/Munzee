import type { Meta, StoryObj } from "@storybook/react";
import roversTable from "./index";

const meta = {
  title: "components/RoversTable",
  component: roversTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof roversTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: ["Rank", "Rover", "Miles", "Score"],
    data: [
      {
        rank: "#1",
        imageUrl: "https://munzee.global.ssl.fastly.net/images/rover/rover.png",
        username: " 🐾BAJA Bowser🐾",
        by: "BAJACLAN",
        miles: "1,842,930",
        score: "1865",
      },
    ],
  },
};
