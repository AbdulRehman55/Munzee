import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
  title: "components/Button",
  component: Button,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnexistingClassName: Story = {
  args: {
    className: "blah",
    children: "Hello, World!",
    onClick: () => {},
  },
};
