import type { Meta, StoryObj } from "@storybook/react";

// components
import InviteesSelect from "components/InviteesSelect/InviteesSelect";

// other
import { ContextDecorator } from "stories/utils";
import { mockSelectState } from "utils/mocks/hooks";

const meta = {
  title: "Additional components/Invitees Select",
  component: InviteesSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "This component lists up to three users you can invite to an event.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [ContextDecorator],
} satisfies Meta<typeof InviteesSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    countriesSelect: {
      ...mockSelectState,
      props: {
        options: [],
        defaultValue: null,
        id: "choose-country",
        isMulti: true,
        required: false,
        placeholder: "Select the team's country or everyone is invited.",
        label: "Team's Country",
      },
    },
    inviteesSelect: {
      ...mockSelectState,
      props: {
        options: [],
        id: "choose-users",
        defaultValue: [],
        label: "Invite",
        isMulti: true,
        required: false,
        placeholder: "Everyone is invited unless specified differently.",
        width: "100%",
      },
    },
  },
};
