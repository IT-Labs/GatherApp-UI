// hooks/methods
import { useState, useEffect } from "react";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// components
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// styles
import { SContainer, Icon } from "./styles";

function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      if (window.pageYOffset > 30) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  }, []);

  if (!showButton) {
    return null;
  }

  return (
    <SContainer>
      <FontAwesomeIcon
        style={Icon}
        icon={faArrowUp}
        title="Scroll to top"
        size="2x"
        color="var(--primary-color-green)"
        cursor="pointer"
        onClick={handleScrollToTop}
      />
    </SContainer>
  );
}

export default ScrollToTopButton;
