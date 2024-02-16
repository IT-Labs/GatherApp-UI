import type { Meta, StoryObj } from "@storybook/react";

// components
import CustomSelect from "components/Reusable/Select/CustomSelect";

// other
import { mockSelectState } from "utils/mocks/hooks";

const meta = {
  title: "Reusable components/Custom Select",
  component: CustomSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The custom dropdown component. Used as a simple dropdown select list, as well as multiselect.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCountries = [
  {
    label: "Macedonia",
    value: "Macedonia",
  },
  {
    label: "Serbia",
    value: "Serbia",
  },
  {
    label: "Portugal",
    value: "Portugal",
  },
];

export const CategorySelect: Story = {
  args: mockSelectState,
};

export const TeamsCountrySelect: Story = {
  args: {
    ...mockSelectState,
    props: {
      options: mockCountries,
      defaultValue: null,
      id: "choose-country",
      isMulti: true,
      required: false,
      placeholder: "Select the team's country or everyone is invited.",
      label: "Team's Country",
    },
  },
};
