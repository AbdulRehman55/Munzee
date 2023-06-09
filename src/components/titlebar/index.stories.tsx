import type { Meta, StoryObj } from "@storybook/react";
import titlebar from "./index";

const meta = {
  title: "components/Titlebar",
  component: titlebar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof titlebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bgColor: "",
    title: "default",
    details: "without bgColor title",
  },
};

export const Primary: Story = {
  args: {
    bgColor: "primary",
    title: "primary",
    details: "primary bgcolor title",
  },
};

export const Secondary: Story = {
  args: {
    bgColor: "secondary",
    title: "secondary",
    details: "secondary bgcolor title",
  },
};
