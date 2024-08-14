import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";
import { NotFound } from "../not-found";

const meta = {
  title: "NotFound",
  component: NotFound,
  decorators: [withRouter()],
} satisfies Meta<typeof NotFound>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
