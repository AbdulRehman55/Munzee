import type { Meta, StoryObj } from "@storybook/react";
import PageTitle from "./index";

const pageTitleMeta = {
  title: "components/PageTitle",
  component: PageTitle,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PageTitle>;



export default pageTitleMeta;
type Story = StoryObj<typeof pageTitleMeta>;

export const Default: Story = {
  args: {
    title: "PageTitle",
  },
};
export const withDetailsAndChildren: Story = {
  args: {
    title: "PageTitle",
    details: "details about page titles",
    children: <p>this is page title children</p>,
  },
};


