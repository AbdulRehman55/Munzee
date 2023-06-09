import type { Meta, StoryObj } from "@storybook/react";
import Panel from "./index";

const meta = {
  title: "components/Panel",
  component: Panel,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
  args: {
    text: "Panel text",
    theme: "dark",
  },
};

export const LightPanel: Story = {
    args: {
      text: "Panel text",
      theme: "light",
    },
  };