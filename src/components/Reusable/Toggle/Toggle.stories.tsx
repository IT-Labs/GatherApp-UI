import type { Meta, StoryObj } from "@storybook/react";

// components
import Toggle from "components/Reusable/Toggle/Toggle";
import { mockCheckboxState } from "utils/mocks/hooks";

const meta = {
  title: "Reusable components/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "When clicked, the toggle button changes the type of an event.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "",
    state: mockCheckboxState,
  },
};

export const Checked: Story = {
  args: {
    id: "",
    state: { ...mockCheckboxState, checked: true, label: "Event Type: Online" },
  },
};
