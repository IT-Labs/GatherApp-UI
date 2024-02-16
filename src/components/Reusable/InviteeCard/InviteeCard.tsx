import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

import {
  SContainer,
  SEmail,
  SFontAwesomeIcon,
  SImg,
  SName,
  SText,
} from "./styles";

interface Props {
  value?: string;
  profilePicture: string | null | undefined;
  label: string;
  email: string;
  isViewInvitee?: boolean;
}

export default function InviteeCard({
  value,
  profilePicture,
  label,
  email,
  isViewInvitee,
}: Props) {
  return (
    <SContainer key={value} isViewInvitee={isViewInvitee}>
      {profilePicture ? (
        <SImg
          src={profilePicture || ""}
          alt="avatar"
          isViewInvitee={isViewInvitee}
        />
      ) : (
        <SFontAwesomeIcon icon={faUserCircle} isViewInvitee={isViewInvitee} />
      )}
      <SText isViewInvitee={isViewInvitee}>
        <SName>{label}</SName>
        <SEmail>{email}</SEmail>
      </SText>
    </SContainer>
  );
}
