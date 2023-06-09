import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import verticalTabs from "./index";

const meta = {
  title: "components/VerticalTabs",
  component: verticalTabs,
  decorators: [withRouter],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof verticalTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { title: "About", route: "/company/about" },
      { title: "Team", route: "/company/team" },
    ],
  },
};
