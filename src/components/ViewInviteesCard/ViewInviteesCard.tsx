// components
import InviteeCard from "components/Reusable/InviteeCard/InviteeCard";

// types and constants
import { Invitee } from "ts/types/Event";

interface IProps {
  person: Invitee;
}

const ViewInviteesCard = ({ person }: IProps) => {
  return (
    <InviteeCard
      profilePicture={person.profilePicture}
      label={person.fullName}
      email={person.email}
      isViewInvitee
    />
  );
};

export default ViewInviteesCard;
