//  hooks/methods
import useHandleCallToAction from "hooks/useHandleCallToAction";
import { useAppSelector } from "store/store";
import { splitCamelCase } from "utils/helpers";

//  types and constants
import { SingleEvent } from "ts/types/Event";
import { ButtonType } from "ts/enums/ButtonType";

//  components
import Button from "components/Reusable/Button/Button";
import { InvitationStatus } from "ts/enums/InvitationStatusEnum";

// styles
import {
  GoingButtonStyles,
  MaybeButtonStyles,
  NotGoingButtonStyles,
  ViewEventStyles,
} from "components/Reusable/CTAButtons/styles";

type Props = {
  event: SingleEvent;
  isHomePage?: boolean;
};

export default function CTAButtons({ event, isHomePage }: Props) {
  const userId = useAppSelector((state) => state.login.user.id);

  const { buttons, clickedButton, handleCallToAction, isShowing } =
    useHandleCallToAction({ event, userId });

  //    handle button styles on home page CTA buttons
  const handleHomeClickedButtonStyle = (
    buttonId: keyof typeof InvitationStatus
  ) => {
    switch (InvitationStatus[buttonId]) {
      case InvitationStatus.Going:
        return GoingButtonStyles;

      case InvitationStatus.Maybe:
        return MaybeButtonStyles;

      case InvitationStatus.NotGoing:
        return NotGoingButtonStyles;

      default:
        return {};
    }
  };

  if (!isShowing) return null;

  return (
    <>
      {buttons.map((button) => (
        <Button
          key={button}
          id={button}
          buttonType={isHomePage ? ButtonType.OUTLINED : ButtonType.SOLID}
          customStyles={
            isHomePage ? handleHomeClickedButtonStyle(button) : ViewEventStyles
          }
          onClick={() => handleCallToAction(button)}
          disabled={clickedButton === InvitationStatus[button]}
        >
          {splitCamelCase(button)}
        </Button>
      ))}
    </>
  );
}
