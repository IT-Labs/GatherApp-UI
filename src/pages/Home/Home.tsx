// hooks/methods
import { useContext, useEffect, useState } from "react";
import { useCustomSelect } from "hooks/useCustomSelect";
import ModalContext from "Contexts/ModalContext";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import ScrollToTopButton from "components/Reusable/BackToTopButton/BackToTopButton";
import CustomSelect from "components/Reusable/Select/CustomSelect";
import EventPage from "components/EventPage/EventPage";
import HomePageFilters from "components/HomePageFilters/HomePageFilters";
import SelectLocation from "components/SelectLocation/SelectLocation";

// types
import { HomePageFilterState } from "ts/types/Event";

// styles
import {
  SMainContainer,
  SContainer,
  SelectViewContainer,
} from "pages/Home/styles";
import { useAppSelector } from "store/store";

const viewData = [
  { label: "Grid view", value: "grid" },
  { label: "List view", value: "list" },
];

export default function Home() {
  const { handleModal } = useContext(ModalContext);
  const [areInputsChanged, setAreInputsChanged] = useState(false);
  const [filters, setFilters] = useState<HomePageFilterState>(null);
  const user = useAppSelector((state) => state.login.user);

  useEffect(() => {
    if (user.countryId === null || user.countryName === null) {
      handleModal(
        <SelectLocation
          user={user}
          closeModal={() => handleModal(null, false)}
        />,
        true
      );
    }
  }, []);

  const viewTypeFilterState = useCustomSelect({
    defaultValue: viewData[0],
    options: viewData,
    id: "choose-view-filter",
    required: false,
    isMulti: false,
  });

  const handleWindowResize = () => {
    if (window.innerWidth < 1000) {
      viewTypeFilterState.props.onChange!(viewData[0], {
        action: "select-option",
        option: viewData[0],
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <PageTitle>Upcoming Events</PageTitle>
      <SMainContainer>
        <SContainer>
          <SelectViewContainer>
            <CustomSelect {...viewTypeFilterState} />
          </SelectViewContainer>
          {filters !== null && (
            <EventPage
              isGridView={viewTypeFilterState.getSelectValue() === "grid"}
              filterState={filters}
              haveFiltersChanged={areInputsChanged}
            />
          )}
        </SContainer>

        <>
          <HomePageFilters
            setAreInputsChanged={setAreInputsChanged}
            setFilters={setFilters}
          />

          <ScrollToTopButton />
        </>
      </SMainContainer>
    </>
  );
}
