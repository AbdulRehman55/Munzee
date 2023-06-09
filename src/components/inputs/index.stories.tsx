import type { Meta, StoryObj } from "@storybook/react";
import Input from "./index";

const meta = {
  title: "components/Input",
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Input label",
    placeholder:"place holder for input",
    className:"loginInput",
    value:"test@gmail.com"
  },
};
