// hooks/methods
import { useState } from "react";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import RequestsPage from "components/Requests/RequestsPage/RequestsPage";
import ScrollToTopButton from "components/Reusable/BackToTopButton/BackToTopButton";
// import MainContainer from "components/Reusable/MainContainer/MainContainer";

// types and constants
import { ButtonType } from "ts/enums/ButtonType";
import { EventStatusFilters } from "ts/enums/EventStatuses";

// styles
import {
  SMainContainer,
  SButton,
  SButtonContainer,
} from "pages/Requests/styles";

function Requests() {
  const [selected, setSelected] = useState<EventStatusFilters>(
    EventStatusFilters.Pending
  );

  const tabs = [EventStatusFilters.Pending, EventStatusFilters.Approved];

  return (
    <>
      <PageTitle>{selected} Events</PageTitle>
      <SMainContainer>
        <SButtonContainer>
          {tabs.map((tab) => (
            <SButton
              id={tab}
              key={tab}
              name={tab}
              buttonType={ButtonType.OUTLINED}
              onClick={() => setSelected(tab)}
              isSelected={selected === tab}
            >
              {tab}
            </SButton>
          ))}
        </SButtonContainer>
        <RequestsPage status={selected} />
      </SMainContainer>
      <ScrollToTopButton />
    </>
  );
}

export default Requests;
