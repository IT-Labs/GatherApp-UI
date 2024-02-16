import type { Meta, StoryObj } from "@storybook/react";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";

const meta = {
  title: "Reusable components/Page Title",
  component: PageTitle,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "The title of a page.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [(story) => <div style={{ margin: "3rem" }}>{story()}</div>],
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: {
    children: "Home",
  },
};

export const AdminPanel: Story = {
  args: {
    children: "Admin Panel",
  },
};
