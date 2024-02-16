import { useApproveEventMutation } from "services/api/gatherapp";
import useOutlook from "hooks/useOutlook";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownActions from "ts/enums/DropdownActions";
import { ApproveEventRequest, EventOnlyProps } from "ts/types/Event";
import { EventStatuses } from "ts/enums/EventStatuses";
import { SLi } from "components/Reusable/EventDropDown/styles";

const ApproveEventAction = ({ event }: EventOnlyProps) => {
  const [acceptEvent] = useApproveEventMutation();

  const outlook = useOutlook();

  const handleAccept = async () => {
    const formData: ApproveEventRequest = {
      id: event.id,
      status: EventStatuses.Approved,
    };

    const response = await acceptEvent(formData);
    if ("error" in response) return;
    await outlook.add(event);
  };

  return (
    <SLi onClick={handleAccept}>
      <FontAwesomeIcon
        icon={faCheckCircle}
        color="var(--secondary-color-green)"
        size="2xs"
        cursor="pointer"
      />
      <p>{DropdownActions.Approve}</p>
    </SLi>
  );
};

export default ApproveEventAction;
