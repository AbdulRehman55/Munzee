import type { Meta, StoryObj } from "@storybook/react";
import PhotoGalleryMoreItem from "./PhotoGalleryMoreItem";
import teamMember3 from "../../assets/images/team_member_3.jpeg";

const meta = {
  title: "components/PhotoGalleryMoreItem",
  component: PhotoGalleryMoreItem,
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof PhotoGalleryMoreItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
  args: {
    index: 1,
    onSelect: () => {},
    pic: teamMember3,
    large: teamMember3,
    time: "2 days ago",
    location: "Some location",
  },
};
