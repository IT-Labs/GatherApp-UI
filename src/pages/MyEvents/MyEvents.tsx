// hooks/methods
import { useState } from "react";
import { isUserAdmin } from "utils/helpers";
import { useCustomSelect } from "hooks/useCustomSelect";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import CustomSelect from "components/Reusable/Select/CustomSelect";
import ScrollToTopButton from "components/Reusable/BackToTopButton/BackToTopButton";

// types and constants
import { ButtonType } from "ts/enums/ButtonType";
import { EventStatusFilters } from "ts/enums/EventStatuses";

import { eventOrganizersData } from "constants/selectOptions";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MyEventsPage from "./MyEventsPage"; // must be after MyEventsTabs

// styles
import {
  SMainContainer,
  STabContainer,
  SButton,
  SLeftContainer,
  SRightContainer,
  SLRContainer,
  MobileTabStyles,
} from "./styles";

const MyEvents = () => {
  const user = useSelector((state: RootState) => state.login.user);

  const isAdmin = isUserAdmin(user.roleName);

  const [selectedTab, setSelectedTab] = useState<EventStatusFilters>(
    isAdmin ? EventStatusFilters.Approved : EventStatusFilters.Pending
  );

  const [dropdownOpen, setDropdownOpen] = useState(true);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const organizerSelect = useCustomSelect({
    options: eventOrganizersData,
    defaultValue: eventOrganizersData[0],
    id: "organizer-select",
  });
  // standard query

  // array used in the CustomSelect component

  const tabs = isAdmin
    ? [EventStatusFilters.Approved, EventStatusFilters.Past]
    : Object.values(EventStatusFilters);

  return (
    <>
      <PageTitle>My Events</PageTitle>
      <SMainContainer>
        <SLRContainer>
          <SLeftContainer isAdmin={isAdmin}>
            <SButton onClick={toggleDropdown} customStyles={MobileTabStyles}>
              <FontAwesomeIcon
                icon={faBars}
                title="Dropdown"
                size="2x"
                cursor="pointer"
              />
            </SButton>
            {dropdownOpen && (
              <STabContainer isAdmin={isAdmin}>
                {tabs.map((tab) => (
                  <SButton
                    id={tab}
                    key={tab}
                    name={tab}
                    buttonType={ButtonType.OUTLINED}
                    onClick={() => setSelectedTab(tab)}
                    isSelected={selectedTab === tab}
                  >
                    {isAdmin && tab === EventStatusFilters.Approved
                      ? "Upcoming"
                      : tab}
                  </SButton>
                ))}
              </STabContainer>
            )}
            <MyEventsPage
              eventStatus={selectedTab}
              userId={user.id}
              organizer={organizerSelect.getSelectValue()}
            />
          </SLeftContainer>

          {isAdmin && (
            <SRightContainer>
              <CustomSelect {...organizerSelect} />
            </SRightContainer>
          )}
        </SLRContainer>
        <ScrollToTopButton />
      </SMainContainer>
    </>
  );
};

export default MyEvents;
