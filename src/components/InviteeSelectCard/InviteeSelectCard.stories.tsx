import type { Meta, StoryObj } from "@storybook/react";

// components
import InviteeSelectCard from "components/InviteeSelectCard/InviteeSelectCard";

const meta = {
  title: "Additional components/Invitee Select Card",
  component: InviteeSelectCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "This component displays the basic user info and is part of the Invitee Select component.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InviteeSelectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  label: "John Doe",
  value: "1",
  profilePicture: "",
  email: "john.doe@doesntexist.com",
};
export const Default: Story = {
  args: mockUser,
};
