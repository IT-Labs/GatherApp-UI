// hooks/methods
import { useParams } from "react-router-dom";
import { useGetEventQuery } from "services/api/gatherapp";

// components
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import EventForm from "./EventForm";

const EditEventForm = () => {
  const { eventId } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetEventQuery(eventId!);

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );
  return <EventForm editFields={data} />;
};

export default EditEventForm;
