import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import MunzeeSubMenu from "./index";

const meta = {
    title: "components/MunzeeSubMenu",
    component: MunzeeSubMenu,
    decorators: [withRouter],
    tags: ["autodocs"],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
        layout: "fullscreen",
    },
} satisfies Meta<typeof MunzeeSubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};