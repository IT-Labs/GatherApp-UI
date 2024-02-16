import { SingleEvent } from "ts/types/Event";
import { DateToDayjsObj } from "utils/helpers";
import { SDateTimeContainer } from "./styles";

const ViewEventDate = ({
  dateStart,
  dateEnd,
}: Pick<SingleEvent, "dateStart" | "dateEnd">) => {
  const startDate = DateToDayjsObj(dateStart);
  const endDate = DateToDayjsObj(dateEnd);

  const dateFormat = "D, MMMM [at] HH:mm";

  return (
    <SDateTimeContainer>
      {`Start: ${startDate.format(dateFormat)}`}
      <br />
      {`End: ${endDate.format(dateFormat)}`}
    </SDateTimeContainer>
  );
};

export default ViewEventDate;
