import type { Meta, StoryObj } from "@storybook/react";
import TypesCard from "./index";

const typesCardMeta = {
  title: "components/TypesCard",
  component: TypesCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof TypesCard>;

export default typesCardMeta;
type Story = StoryObj<typeof typesCardMeta>;

export const Default: Story = {
  args: {
    rotate: false,
    data: [
      {
        title: "title",
        name: "string",
        imgSrc: "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
        deploymentPoints: 20,
        capturePoints: 30,
        ownerPoints: 40,
      },
    ],
  },
};
export const hoverEffect: Story = {
  args: {
    rotate: true,
    data: [
      {
        title: "title",
        name: "string",
        imgSrc: "https://munzee.global.ssl.fastly.net/images/pins/munzee.png",
      },
    ],
  },
};
