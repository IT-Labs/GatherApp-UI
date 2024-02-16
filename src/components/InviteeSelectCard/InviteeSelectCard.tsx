// components
import InviteeCard from "components/Reusable/InviteeCard/InviteeCard";

// types and constants
import { InviteeOption } from "ts/types/User";

const InviteeSelectCard = ({
  email,
  value,
  profilePicture,
  label,
}: InviteeOption) => {
  return (
    <InviteeCard
      value={value}
      profilePicture={profilePicture}
      label={label}
      email={email}
    />
  );
};

export default InviteeSelectCard;
