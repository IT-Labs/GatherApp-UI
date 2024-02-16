// libraries
import parse from "html-react-parser";

// types
import { SingleEvent } from "ts/types/Event";

// components
import LinkifyWrapper from "components/Reusable/LinkifyWrapper/LinkifyWrapper";
import { SCornerBorder } from "./styles";

const ViewEventDescription = ({
  description,
}: Pick<SingleEvent, "description">) => {
  return (
    <LinkifyWrapper>
      <SCornerBorder>{parse(description)}</SCornerBorder>
    </LinkifyWrapper>
  );
};

export default ViewEventDescription;
