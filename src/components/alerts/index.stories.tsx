import type { Meta, StoryObj } from "@storybook/react";
import Alerts from "./index";

const meta = {
  title: "components/Alerts",
  component: Alerts,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Alerts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const success: Story = {
  args: {
    children: "alert body",
    type: "success",
    align: "center",
  },
};

export const info: Story = {
  args: {
    children: "alert body",
    type: "info",
    align: "center",
  },
};
