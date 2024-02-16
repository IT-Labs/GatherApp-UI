import { useState, useEffect, Dispatch, SetStateAction } from "react";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import FiltersGroup from "components/FiltersGroup/FiltersGroup";

// types
import { HomePageFilterState } from "ts/types/Event";

// styles
import { SFilterIconContainer } from "components/HomePageFilters/styles";

export type HomeStateProps = {
  setAreInputsChanged: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<HomePageFilterState>>;
};

const HomePageFilters = ({
  setAreInputsChanged,
  setFilters,
}: HomeStateProps) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [isToggledOn, setIsToggledOn] = useState(false);

  const handleWindowResize = () => {
    setIsMobileView(window.innerWidth < 800);
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleCloseModal = () => {
    setIsToggledOn(false);
  };

  const filterProps = {
    setAreInputsChanged,
    setFilters,
    isMobileView,
    isToggledOn,
    handleCloseModal,
  };

  const handleOpenModal = () => {
    setIsToggledOn(true);
  };

  useEffect(() => {
    if (isToggledOn) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }
  }, [isToggledOn]);

  return (
    <>
      {isMobileView && (
        <SFilterIconContainer onClick={handleOpenModal}>
          <FontAwesomeIcon
            icon={faFilter}
            id="hamburgerIcon"
            cursor="pointer"
            size="2x"
          />
        </SFilterIconContainer>
      )}
      <FiltersGroup {...filterProps} />
    </>
  );
};

export default HomePageFilters;
