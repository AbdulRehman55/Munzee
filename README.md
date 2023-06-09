# munzee-web-v2

New munzee web repository setup for Typescript / React project - to interface with Munzee v2 Backend

## Munzee backend and Firebase integration

The code in `src/munzee-backend` handles the Firebase SDK initialization, the authentication operations (login, logout and signup) using both Firebase and the Munzee API and it provides a `callAPI` function to interact with the Munzee API endpoints (it takes care of refreshing the Firebase auth token, formatting the POST parameters and handling the server responses).

It also exposes some public methods for that explicitly describe common API calls in TypeScript with the required parameter types as well as the response types.

## Storybook integration

The purpose of Storybook is to make it easier to work on UI components with various states without having to launch the application and get it in the desired state.

To launch Storybook for development run `npm run storybook`. This will launch Storybook's web interface which allows browsing the existing components and their states as well as customizing some component props directly.

To create a new set of stories for a component we just need to create a new `*.stories.tsx` file and Storybook will include it in the UI. For example:

```
import type { Meta, StoryObj } from "@storybook/react";
import DetailCard from "./detailCard";

const meta = {
  title: "components/DetailCard",
  component: DetailCard
} satisfies Meta<typeof DetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithSomeRandomData: Story = {
  args: {
    iconClass: "className1",
    title: "This is the Title",
    details: "Here is a search engine",
    link: "https://google.com",
    linkText: "Google",
  },
};

export const WithOtherRandomData: Story = {
  args: {
    iconClass: "className2",
    title: "This is another Title",
    details: "Here's a...",
    link: "https://yahoo.com",
    linkText: "Yahoo",
  },
};
```

Finally the component catalog can be built and distributed as a standalone static web app and this is currently being done automatically with GitHub Actions and GitHub Pages.

Official website and documentation:

- https://storybook.js.org/
- https://storybook.js.org/docs/react/writing-stories/introduction
