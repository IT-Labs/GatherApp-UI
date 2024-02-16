import type { Meta, StoryObj } from "@storybook/react";

// components
import ProfilePicture from "components/Reusable/ProfilePicture/ProfilePicture";

// other
import profilePicture from "stories/assets/profile-picture-example.png";

const meta = {
  title: "Reusable components/Profile Picture",
  component: ProfilePicture,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The avatar or profile picture displayed on your profile page, as well as in the Invite field on the Create event page.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProfilePicture>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultAvatarPhoto: Story = {
  args: {
    image: null,
    iconStyle: {},
    imageStyle: {},
  },
};

export const UploadedPhoto: Story = {
  args: {
    image: profilePicture,
    iconStyle: {},
    imageStyle: {
      width: "2.5rem",
      height: "2.5rem",
      borderRadius: "50%",
    },
  },
};
