import styled from "styled-components";

export const NOTIFICATION_TYPES = {
  NOTIFICATION: "notification",
  ERROR: "error",
  LOADING: "loading",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
type SNotificationProps = {
  type: NotificationType;
  isShowing: boolean;
};

export const SNotification = styled.span<SNotificationProps>`
  min-height: 1rem;
  color: ${(props) =>
    props.type === NOTIFICATION_TYPES.ERROR
      ? "var(--primary-color-red)"
      : "var(--primary-color-white)"};
  margin: 0.438rem;
  text-align: center;
  display: block;
  visibility: ${(props) => (props.isShowing ? "visible" : "hidden")};
`;
