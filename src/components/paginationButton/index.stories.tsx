import type { Meta, StoryObj } from "@storybook/react";
import PaginationButton from "./index";

const meta = {
  title: "components/PaginationButton",
  component: PaginationButton,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PaginationButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconPosLeft: Story = {
  args: {
    title: "Older",
    className: "fa fa-arrow-left",
    iconPosition: "left",
  },
};

export const IconPosRight: Story = {
  args: {
    title: "Newer",
    iconPosition: "right",
    className: "fa fa-arrow-right",
  },
};

export const disabled: Story = {
  args: {
    title: "Newer",
    iconPosition: "right",
    disabled: true,
    className: "fa fa-arrow-right",
  },
};
