// hooks
import { useEffect } from "react";
import { Link } from "react-router-dom";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { faBars } from "@fortawesome/free-solid-svg-icons";
import LogoutLink from "components/Logout/Logout";
import Logo from "components/Reusable/Logo/Logo";

// styles/types/constants
import {
  SHamburgerContainer,
  SMainContainer,
  SUl,
  SLi,
  SLogoContainer,
  SLogoAndHamburger,
} from "components/NavBar/NavBarMobile/styles";
import { NavBarProps } from "ts/types/Other";
import { routesToMap } from "constants/pageRoutesData";

const NavBarMobile = ({ isAdmin, handleClick, toggle }: NavBarProps) => {
  const getIsActive = (endpoint: string) => {
    const currentActivePage = window.location.pathname;

    return endpoint === currentActivePage;
  };

  useEffect(() => {
    if (toggle) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [toggle]);

  return (
    <SMainContainer>
      <SLogoAndHamburger>
        <SHamburgerContainer onClick={handleClick}>
          <FontAwesomeIcon
            icon={faBars}
            id="hamburgerIcon"
            cursor="pointer"
            size="2x"
          />
        </SHamburgerContainer>
        <SLogoContainer>
          <Logo />
        </SLogoContainer>
      </SLogoAndHamburger>
      {toggle && (
        <SUl>
          {routesToMap.map((route) => {
            if (route.adminDependent && !isAdmin) return null;

            return (
              <SLi isActive={getIsActive(route.to)} key={route.value}>
                <Link to={route.to} onClick={handleClick}>
                  {route.value}
                </Link>
              </SLi>
            );
          })}
          <SLi>
            <LogoutLink onClick={handleClick} />
          </SLi>
        </SUl>
      )}
    </SMainContainer>
  );
};

export default NavBarMobile;
