import type { Meta, StoryObj } from "@storybook/react";

// components
import NavBar from "components/NavBar/NavBar";
import { ContextDecorator, StoreDecorator } from "stories/utils";

const meta = {
  title: "Additional components/Navigation Bar",
  component: NavBar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The navigation bar is used for accessing different parts of the application.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [ContextDecorator],
} satisfies Meta<typeof NavBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserView: Story = {
  decorators: [(Story) => StoreDecorator("User", Story)],
};

export const AdminView: Story = {
  decorators: [(Story) => StoreDecorator("Admin", Story)],
};
