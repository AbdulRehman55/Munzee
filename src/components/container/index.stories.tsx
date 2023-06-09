import type { Meta, StoryObj } from "@storybook/react";
import Container from "./index";

const meta = {
  title: "components/Container",
  component: Container,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
     children:<p>This is a container with some text.</p>,
    },
  };
