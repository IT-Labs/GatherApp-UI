import type { Meta, StoryObj } from "@storybook/react";

// components
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// other
import notificationMessages from "constants/notificationMessages";
import { NOTIFICATION_TYPES } from "./styles";

const meta = {
  title: "Reusable components/Notification Message",
  component: NotificationMessage,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "This component displays a specified notification message.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: notificationMessages.successfulLogout,
  },
};

export const Error: Story = {
  args: {
    type: NOTIFICATION_TYPES.ERROR,
    message: "You can’t use less than 20 characters.",
  },
};
