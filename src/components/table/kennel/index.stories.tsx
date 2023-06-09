import type { Meta, StoryObj } from "@storybook/react";
import kennelTable from "./index";

const meta = {
  title: "components/KennelTable",
  component: kennelTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof kennelTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: ["Rover", "Total Miles", "Score", "Level", "Global Rank"],
  },
};

export const Transported: Story = {
  args: {
    columns: [
      "Rover",
      "Miles Transported",
      "Total Miles",
      "Score",
      "Level",
      "Global Rank",
    ],
  },
};
