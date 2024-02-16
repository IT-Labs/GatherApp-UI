// hooks
import { Link } from "react-router-dom";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileIconMenu from "components/ProfileIconMenu/ProfileIconMenu";
import Logo from "components/Reusable/Logo/Logo";

// styles, types, constants
import { routesToMap } from "constants/pageRoutesData";
import { NavBarProps } from "ts/types/Other";
import {
  SIconContainer,
  SLi,
  SUl,
  SLogoContainer,
} from "components/NavBar/NavBarDesktop/styles";

const requiredPages = ["Home", "Create", "Requests", "Admin Panel"];

const NavBarDesktop = ({ isAdmin, handleClick, toggle }: NavBarProps) => {
  return (
    <>
      <SLogoContainer>
        <Logo />
      </SLogoContainer>
      <SUl>
        {routesToMap.map((route) => {
          if (
            !requiredPages.includes(route.value) ||
            (route.adminDependent && !isAdmin)
          ) {
            return null;
          }

          return (
            <Link to={route.to} key={route.value}>
              <SLi>{route.value}</SLi>
            </Link>
          );
        })}
        <SLi style={{ padding: "0", minWidth: "4rem" }} toggle={toggle}>
          <SIconContainer onClick={handleClick} toggle={toggle}>
            <FontAwesomeIcon icon={faUser} id="profileIcon" cursor="pointer" />
          </SIconContainer>
          {toggle && <ProfileIconMenu handleClick={handleClick} />}
        </SLi>
      </SUl>
    </>
  );
};

export default NavBarDesktop;
