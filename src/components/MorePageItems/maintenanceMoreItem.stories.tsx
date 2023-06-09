import type { Meta, StoryObj } from "@storybook/react";
import MaintenanceMoreItem from "./MaintenanceMoreItem";

const meta = {
    title: "components/MaintenanceMoreItem",
    component: MaintenanceMoreItem,
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof MaintenanceMoreItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Item: Story = {
    args: {
        message: "Test message",
        timeReported: "2 days ago",
        timeCaptured: "2 days ago",
    }
};