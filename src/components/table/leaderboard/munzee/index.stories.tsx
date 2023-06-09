import type { Meta, StoryObj } from "@storybook/react";
import munzeeTable from "./index";

const meta = {
  title: "components/MunzeeTable",
  component: munzeeTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof munzeeTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Overall",
    data: [
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/social_munzees/ew25.png",
        username: " 1849 Badge",
        score: "12,76",
        rank: "#1",
        player: "1849",
      },
      {
        imageUrl:
          "https://munzee.global.ssl.fastly.net/images/social_munzees/ew4s.png",
        username: "  //EXUS69 ♋️",
        score: "12,76",
        rank: "#2",
        player: " Nexus69",
      },
    ],
  },
};
