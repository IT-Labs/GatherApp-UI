import type { Meta, StoryObj } from "@storybook/react";

// components
import Calendar from "components/Calendar/Calendar";

// other
import { ContextDecorator } from "stories/utils";

const meta = {
  title: "Additional components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "This is a calendar component displayed on the My profile page. It should display all events the user has created, as well as responded to.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (story) => <div style={{ width: "50vw" }}>{ContextDecorator(story)}</div>,
  ],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
