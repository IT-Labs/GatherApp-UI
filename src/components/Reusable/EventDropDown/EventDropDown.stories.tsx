import type { Meta, StoryObj } from "@storybook/react";

// components
import EventDropDown from "components/Reusable/EventDropDown/EventDropDown";

// other
import { ContextDecorator, StoreDecorator } from "stories/utils";
import { mockEvent } from "utils/mocks/hooks";
import { EventStatuses } from "ts/enums/EventStatuses";
import DropdownActions from "ts/enums/DropdownActions";

const meta = {
  title: "Additional components/Event Dropdown Actions",
  component: EventDropDown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "By clicking on this component you will open a menu with a list of available actions. It's used on event cards.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [ContextDecorator],
} satisfies Meta<typeof EventDropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ApprovedEvent: Story = {
  args: {
    event: mockEvent,
  },
};

export const PendingEventUserView: Story = {
  args: {
    event: {
      ...mockEvent,
      status: EventStatuses.Pending,
    },
  },
  decorators: [(Story) => StoreDecorator("User", Story)],
};

export const PendingEventAdminView: Story = {
  args: {
    event: { ...mockEvent, status: EventStatuses.Pending },
    actions: [
      DropdownActions.Approve,
      DropdownActions.Decline,
      DropdownActions.Edit,
    ],
  },
  decorators: [(Story) => StoreDecorator("Admin", Story)],
};

export const DeclinedEvent: Story = {
  args: {
    event: { ...mockEvent, status: EventStatuses.Declined },
  },
};
