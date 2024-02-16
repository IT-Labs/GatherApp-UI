// hooks/methods
import { useEffect, useState } from "react";
import { useAppSelector } from "store/store";
import { isUserAdmin } from "utils/helpers";

// components
import NavBarDesktop from "components/NavBar/NavBarDesktop/NavBarDesktop";
import NavBarMobile from "./NavBarMobile/NavBarMobile";

// styles
import { SNav } from "./styles";

export default function NavBar() {
  const [view, setView] = useState(false);
  const [toggle, setToggle] = useState(false);
  // grabbing the user role value
  const userRole = useAppSelector((state) => state.login.user.roleName);
  const isAdmin = isUserAdmin(userRole);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const navBarProps = {
    isAdmin,
    toggle,
    handleClick,
  };

  const handleWindowResize = () => {
    setView(window.innerWidth < 768);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <SNav>
      {view ? (
        <NavBarMobile {...navBarProps} />
      ) : (
        <NavBarDesktop {...navBarProps} />
      )}
    </SNav>
  );
}
