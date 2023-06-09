import type { Meta, StoryObj } from "@storybook/react";
import ActivityFeedItem from "./ActivityFeedItem";

const meta = {
    title: "components/ActivityFeedItem",
    component: ActivityFeedItem,
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof ActivityFeedItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActivityFeed: Story = {
    args: {
        itemId: "Item ID",
        itemType : "Item Type",
        points: 23,
        timestamp: 160000000,
        userData: { user_id: 0, username: "Test User" },
        munzeeData: {
            munzeeId:228930014,
            friendlyName:"Sea Turtle #10191",
            captureTypeId:2476,
            code:"http://www.munzee.com/m/Ashvinfreezetag/94/",
            numberOfCaptures:0,
            pinIcon:"https://munzee.global.ssl.fastly.net/images/pins/seaturtle.png"
        },
        logo: "https://munzee.global.ssl.fastly.net/images/new_badges/small/caphammock1.png",
        name: "STOP! Hammer Time",
    }
}