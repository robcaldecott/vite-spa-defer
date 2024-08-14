import type { Meta, StoryObj } from "@storybook/react";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";
import { UserAvatar } from "../user-avatar";

const meta = {
  title: "UserAvatar",
  component: UserAvatar,
  args: {
    user: {
      id: "1",
      email: "jane.doe@company.com",
      name: "Jane Doe",
      avatar: "https://mui.com/static/images/avatar/3.jpg",
    },
  },
  decorators: [withRouter()],
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: "/login" },
    }),
  },
} as Meta<typeof UserAvatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
