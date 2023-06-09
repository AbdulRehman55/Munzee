import type { Meta, StoryObj } from "@storybook/react";
import BadgesCard from "./index";
import testIcon from "../../assets/images/yeti.png";


const meta = {
    title: "components/BadgesCard",
    component: BadgesCard,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof BadgesCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
    args: {
        icon: testIcon,
        name: "Test name",
        awarded: true,
        children: "Some inner content",
    },
};
