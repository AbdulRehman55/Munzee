import type { Meta, StoryObj } from "@storybook/react";
import socialCard from "./index";

const meta = {
  title: "components/SocialCard",
  component: socialCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof socialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// export const Social: Story = {
//   args: {
//     data: [
//       {
//         createdByText: "Created By",
//         socialImg:
//           "https://munzee.global.ssl.fastly.net/images/social_munzees/cwpxs.png",
//         createdByImg:
//           "https://munzee.global.ssl.fastly.net/images/avatars/ua4lir.png",
//       },
//       {
//         createdByText: "Created By",
//         socialImg:
//           "https://munzee.global.ssl.fastly.net/images/social_munzees/ltrig.png",
//         createdByImg:
//           "https://munzee.global.ssl.fastly.net/images/avatars/ua6jeo.png",
//       },
//     ],
//     screenType: "social",
//   },
// };

// export const OwnSocial: Story = {
//     args: {
//       data:[
//         {
//           "socialImg": "https://munzee.global.ssl.fastly.net/images/pins/social.png",
//           "munzeeText": "Secure Social Munzee",
//           "captureText": "Captures: 0",
//           "deployedText": "Deployed 2 years ago"
//         },
//         {
//           "socialImg": "https://munzee.global.ssl.fastly.net/images/pins/social.png",
//           "munzeeText": "Secure Social Munzee",
//           "captureText": "Captures: 0",
//           "deployedText": "Deployed 2 years ago"
//         },
//       ],
//       screenType: "ownSocial",
//     },
//   };
