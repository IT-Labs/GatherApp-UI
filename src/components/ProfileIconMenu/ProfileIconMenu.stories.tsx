import type { Meta, StoryObj } from "@storybook/react";

// components
import ProfileIconMenu from "components/ProfileIconMenu/ProfileIconMenu";
import { ContextDecorator } from "stories/utils";

const meta = {
  title: "Additional components/Profile Icon Menu",
  component: ProfileIconMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Profile Icon Menu is an extension of the navigation bar, and is used for accessing additional parts of the application.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [ContextDecorator],
} satisfies Meta<typeof ProfileIconMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { handleClick: () => {} },
  decorators: [
    (Story) => (
      <div
        style={{ marginTop: "-12.5rem", display: "flex", position: "relative" }}
      >
        {Story()}
      </div>
    ),
  ],
};
