// hooks/methods
import { useState, useEffect, useRef, MutableRefObject } from "react";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

// types and constants
import { SingleEvent } from "ts/types/Event";
import DropdownActions from "ts/enums/DropdownActions";

// components
import ApproveEventAction from "components/Reusable/EventDropDown/actions/ApproveEventAction";
import EditEventAction from "components/Reusable/EventDropDown/actions/EditEventAction";
import DeleteEventAction from "components/Reusable/EventDropDown/actions/DeleteEventAction";
import DeclineEventAction from "components/Reusable/EventDropDown/actions/DeclineEventAction";

import { SDiv, SEventDropDown, SUl } from "./styles";

type Props = {
  event: SingleEvent;
  actions?: DropdownActions[];
};

function EventDropDown({
  event,
  actions = [DropdownActions.Edit, DropdownActions.Delete],
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef: MutableRefObject<string | any> = useRef();
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const actionComponentMap: Record<DropdownActions, JSX.Element> = {
    [DropdownActions.Approve]: <ApproveEventAction event={event} />,
    [DropdownActions.Decline]: <DeclineEventAction event={event} />,
    [DropdownActions.Edit]: <EditEventAction event={event} />,
    [DropdownActions.Delete]: <DeleteEventAction event={event} />,
  };

  useEffect(() => {
    const handler = (e: Event) => {
      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const mappedActions = actions.map((action) => actionComponentMap[action]);

  return (
    <SEventDropDown ref={menuRef}>
      <FontAwesomeIcon
        color="grey"
        icon={faEllipsis}
        size="2x"
        cursor="pointer"
        onClick={handleToggleMenu}
      />
      {isMenuOpen && (
        <SDiv>
          <SUl>{mappedActions}</SUl>
        </SDiv>
      )}
    </SEventDropDown>
  );
}

export default EventDropDown;
