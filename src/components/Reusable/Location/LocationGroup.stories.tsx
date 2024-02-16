import type { Meta, StoryObj } from "@storybook/react";

// components
import LocationGroup from "components/Reusable/Location/LocationGroup";

// other
import { mockFormInputState } from "utils/mocks/hooks";

const meta = {
  title: "Additional components/Location Group",
  component: LocationGroup,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "This is an input component that changes depending on whether an event is of type Online or On-site.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "31.25rem",
          height: "31.25rem",
          margin: " 12.5rem auto",
        }}
      >
        {Story()}
      </div>
    ),
  ],
} satisfies Meta<typeof LocationGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Online: Story = {
  args: {
    isOnline: true,
    inputState: mockFormInputState,
  },
};

export const Onsite: Story = {
  args: {
    isOnline: false,
    inputState: { ...mockFormInputState, value: "paris france" },
  },
};
