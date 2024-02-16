import type { Meta, StoryObj } from "@storybook/react";

// components
import Input from "components/Reusable/Input/Input";

// other
import { mockFormInputState } from "utils/mocks/hooks";

const meta = {
  title: "Reusable components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The base input component. Has multiple types and use cases.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextInput: Story = {
  args: {
    name: "search",
    id: "search-users",
    type: "text",
    required: false,
    placeholder: "Search for a specific user...",
    state: mockFormInputState,
  },
};

export const PasswordInput: Story = {
  args: {
    name: "password",
    id: "password-field",
    type: "password",
    required: false,
    placeholder: "Enter your password",
    state: mockFormInputState,
  },
};

export const DescriptionInput: Story = {
  args: {
    name: "description",
    id: "description-field",
    type: "description",
    required: false,
    placeholder: "",
    state: mockFormInputState,
  },
};

export const DateInput: Story = {
  args: {
    name: "date",
    id: "date-field",
    type: "date",
    required: false,
    placeholder: "",
    state: { ...mockFormInputState, value: new Date() },
  },
  decorators: [(Story) => <div style={{ width: "20.625rem" }}>{Story()}</div>],
};
