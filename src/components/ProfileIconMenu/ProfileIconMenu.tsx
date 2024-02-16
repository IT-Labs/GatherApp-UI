// hooks/methods
import { useRef, useEffect } from "react";

// components
import LogoutLink from "components/Logout/Logout";

// styles/constants
import { STATIC_ROUTES } from "utils/constants";
import { Link } from "react-router-dom";
import { SMenu, SDiv } from "./styles";

type Props = {
  handleClick: () => void;
};

export default function ProfileIconMenu({ handleClick }: Props) {
  const Ref = useRef(null) as any;
  useEffect(() => {
    const handler = (event: any) => {
      if (!Ref.current.contains(event.target)) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <SMenu ref={Ref}>
      <SDiv>
        <Link to={STATIC_ROUTES.myProfile} onClick={handleClick}>
          My Profile
        </Link>
      </SDiv>
      <SDiv>
        <Link to={STATIC_ROUTES.myEvents} onClick={handleClick}>
          My Events
        </Link>
      </SDiv>
      <SDiv style={{ border: "0" }}>
        <LogoutLink onClick={handleClick} />
      </SDiv>
    </SMenu>
  );
}
