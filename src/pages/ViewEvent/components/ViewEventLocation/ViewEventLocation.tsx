import { faLink, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import InformationField from "components/Reusable/InformationField/InformationField";
import { EventTypes } from "ts/enums/EventTypes";
import { SingleEvent } from "ts/types/Event";
import { SLocationContainer } from "./styles";

const ViewEventLocation = ({
  type,
  locationUrl,
}: Pick<SingleEvent, "type" | "locationUrl">) => {
  return (
    <SLocationContainer>
      {type === EventTypes.Online ? (
        <a href={locationUrl} target="_blank" rel="noreferrer">
          <InformationField icon={faLink} label={locationUrl} />
        </a>
      ) : (
        <InformationField icon={faLocationDot} label={locationUrl} />
      )}
    </SLocationContainer>
  );
};

export default ViewEventLocation;
