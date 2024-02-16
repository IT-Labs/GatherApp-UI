// hooks/methods
import { useState } from "react";

// components
import ViewInviteesCard from "components/ViewInviteesCard/ViewInviteesCard";
import { InvitationStatus } from "ts/enums/InvitationStatusEnum";
import { Invitation } from "ts/types/Event";
import { ctaActions } from "hooks/useHandleCallToAction";
import { splitCamelCase } from "utils/helpers";

// styles
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import { SModal, SButtonContainer, SButton, InviteeContainer } from "./styles";

type Props = {
  invitations: Invitation[];
};

const ViewInviteesModal = ({ invitations }: Props) => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof InvitationStatus>("Going");

  return (
    <SModal>
      <SButtonContainer>
        {ctaActions.map((button) => (
          <SButton
            id={button}
            key={button}
            onClick={() => setActiveTab(button)}
            isActive={activeTab === button}
          >
            {splitCamelCase(button)}
          </SButton>
        ))}
      </SButtonContainer>

      <InviteeContainer>
        {invitations.length ? (
          invitations.map((invitation) => {
            if (invitation.inviteStatus === activeTab)
              return (
                <ViewInviteesCard
                  key={invitation.id}
                  person={invitation.user}
                />
              );

            return null;
          })
        ) : (
          <NotificationMessage message="No users have responded to this event yet." />
        )}
      </InviteeContainer>
    </SModal>
  );
};

export default ViewInviteesModal;
