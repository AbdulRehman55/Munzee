import type { Meta, StoryObj } from "@storybook/react";
import DetailCard from "./detailCard";

const meta = {
  title: "components/DetailCard",
  component: DetailCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSomeRandomData: Story = {
  args: {
    iconClass: "blah",
    title: "blah",
    details: "blah",
    link: "blah",
    linkText: "blah",
  },
};

export const WithOtherRandomData: Story = {
  args: {
    iconClass: "blah",
    title: "blah",
    details: "blah",
    link: "blah",
    linkText: "blah",
  },
};
