import type { Meta, StoryObj } from "@storybook/react";

// components
import EventCard from "components/Reusable/EventCard/EventCard";
import { ContextDecorator } from "stories/utils";
import { mockEvent } from "utils/mocks/hooks";

const meta = {
  title: "Reusable components/Event Card",
  component: EventCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "This component displays basic event information.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => <div style={{ width: "50rem" }}>{ContextDecorator(Story)}</div>,
  ],
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ExampleEvent: Story = {
  args: { event: mockEvent, isGridView: true, isHomePage: true },
};
