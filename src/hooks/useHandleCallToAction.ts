// hooks/methods
import { useState } from "react";
import { useCallToActionMutation } from "services/api/gatherapp";

// libraries
import { toast } from "react-toastify";

// types and constants
import { toastMessages } from "constants/toastMessages";
import { InvitationStatus } from "ts/enums/InvitationStatusEnum";
import { SingleEvent } from "ts/types/Event";
import { swapTwoArrayElements } from "utils/helpers";

type Props = {
  event: SingleEvent;
  userId: string;
};

type CallToActionReturnType = {
  buttons: (keyof typeof InvitationStatus)[];
  clickedButton: InvitationStatus | null;
  invitationId: string;
  handleCallToAction: (
    invitationStatus: keyof typeof InvitationStatus
  ) => Promise<void>;
  isShowing: boolean;
};

const ctaActions = Object.values(InvitationStatus).filter(
  (value) => typeof value === "string"
) as (keyof typeof InvitationStatus)[];

swapTwoArrayElements(ctaActions, 1, 2);

export { ctaActions };

const useHandleCallToAction = ({
  event,
  userId,
}: Props): CallToActionReturnType => {
  const [callToAction] = useCallToActionMutation();

  const foundInvitation = event.invitations.find(
    (invitation) => invitation.user.id === userId
  );

  const [invitationId, setInvitationId] = useState<string>(
    foundInvitation ? foundInvitation.id : ""
  );
  const [clickedButton, setClickedButton] = useState<InvitationStatus | null>(
    foundInvitation && foundInvitation.inviteStatus !== "NoResponse"
      ? InvitationStatus[foundInvitation.inviteStatus]
      : null
  );

  const isShowing = !event.isInviteOnly || foundInvitation !== undefined;

  const handleCallToAction = async (
    invitationStatus: keyof typeof InvitationStatus
  ) => {
    const statusChange = {
      eventId: event.id,
      userId,
      invitationId,
      inviteStatus: InvitationStatus[invitationStatus],
    };

    await callToAction(statusChange)
      .unwrap()
      .then((response) => {
        setInvitationId(response);
        setClickedButton(InvitationStatus[invitationStatus]);
      })
      .catch(() => {
        toast.error(toastMessages.somethingHappened);
      });
  };
  return {
    buttons: ctaActions,
    clickedButton,
    invitationId,
    handleCallToAction,
    isShowing,
  };
};

export default useHandleCallToAction;
