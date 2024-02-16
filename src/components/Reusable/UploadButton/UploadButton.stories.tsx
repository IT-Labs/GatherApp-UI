import type { Meta, StoryObj } from "@storybook/react";

// components
import UploadButton from "components/Reusable/UploadButton/UploadButton";

// other
import { FileInputReturnType } from "hooks/useFileInput";

const meta = {
  title: "Reusable components/Upload Button",
  component: UploadButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "This button is used for uploading images.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div style={{ width: "25rem", height: "18.75rem" }}>{story()}</div>
    ),
  ],
} satisfies Meta<typeof UploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockState: FileInputReturnType = {
  errorMessage: "",
  isValid: true,
  hasChanged: false,
  value: "" as unknown as File,
  onChange: () => {},
  onDragStart: () => {},
  onDragOver: () => {},
  onDrop: () => {},
  reset: () => {},
  resetFile: () => {},
  imageUrl: process.env.REACT_APP_PLACEHOLDER_EVENT_BANNER_URL,
  tooltip: "",
  allowedFileExtensions: ["image/jpeg", "image/jpg, image/png"],
};

export const BannerUpload: Story = {
  args: {
    id: "event-banner",
    name: "event-banner",
    label: "Upload an event banner",
    state: mockState,
  },
};
