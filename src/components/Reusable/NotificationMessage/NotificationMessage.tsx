// styles
import {
  NOTIFICATION_TYPES,
  NotificationType,
  SNotification,
} from "components/Reusable/NotificationMessage/styles";

type LoadingProps = {
  type: "loading";
  isShowing?: boolean;
  message?: string;
};

type BaseProps = {
  type?: Exclude<NotificationType, "loading">;
  isShowing?: boolean;
  message: string;
};

type Props = React.BaseHTMLAttributes<HTMLSpanElement> &
  (LoadingProps | BaseProps);

export const NotificationMessage = ({
  type = NOTIFICATION_TYPES.NOTIFICATION,
  isShowing = true,
  message,
  ...props
}: Props) => {
  return (
    <SNotification {...props} type={type} isShowing={isShowing}>
      {message}
    </SNotification>
  );
};
