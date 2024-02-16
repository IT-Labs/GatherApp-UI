import type { Meta, StoryObj } from "@storybook/react";

// components
import ScrollToTopButton from "components/Reusable/BackToTopButton/BackToTopButton";

const meta = {
  title: "Reusable components/Scroll To Top Button",
  component: ScrollToTopButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "When clicked, this button scrolls to the top of the current page.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div style={{ height: "125rem" }}>
        <h1>Scroll down</h1>
        {story()}
      </div>
    ),
  ],
} satisfies Meta<typeof ScrollToTopButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
