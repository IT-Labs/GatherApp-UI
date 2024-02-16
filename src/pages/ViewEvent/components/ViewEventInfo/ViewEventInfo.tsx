// components
import { faAddressCard, faIcons } from "@fortawesome/free-solid-svg-icons";
import InformationField from "components/Reusable/InformationField/InformationField";

// methods
import { splitCamelCase } from "utils/helpers";

// types/enums
import { SingleEvent } from "ts/types/Event";
import { EventOrganizers } from "ts/enums/EventOrganizers";

import { SCardContainer } from "./styles";

const ViewEventInfo = ({
  organizedBy,
  createdBy,
  category,
}: Pick<SingleEvent, "organizedBy" | "createdBy" | "category">) => {
  const organizerString =
    organizedBy === EventOrganizers.Company ? " - IT Labs" : "";

  return (
    <SCardContainer>
      <InformationField
        icon={faAddressCard}
        label={`${createdBy + organizerString}`}
        width="12.5rem"
      />
      <InformationField
        icon={faIcons}
        label={splitCamelCase(category)}
        width="6.25rem"
      />
    </SCardContainer>
  );
};

export default ViewEventInfo;
