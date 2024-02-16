// hooks/methods

import { Params, useParams } from "react-router-dom";
import { useGetEventQuery } from "services/api/gatherapp";

// components
import PageTitle from "components/Reusable/PageTitle/PageTitle";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

import ViewEventDate from "./components/ViewEventDate/ViewEventDate";
import ViewEventLocation from "./components/ViewEventLocation/ViewEventLocation";
import ViewEventDescription from "./components/ViewEventDescription/ViewEventDescription";
import ViewEventInfo from "./components/ViewEventInfo/ViewEventInfo";
import ViewEventActions from "./components/ViewEventActions/ViewEventActions";

// types and consatnts

// styles
import { SContainer, SMainContainer } from "./styles";

const ViewEvent = () => {
  const params = useParams();

  // get id from URL
  const { eventId }: Readonly<Params<string>> = params;
  // fetch data by eventId
  const { data, isLoading, isError, isSuccess } = useGetEventQuery(eventId!);

  // call this function when you click on the Invitees button

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );

  return (
    <>
      <PageTitle>{data.title}</PageTitle>
      <SMainContainer>
        <SContainer isLeftContainer>
          <SContainer>
            <img src={data.banner} alt="Card banner" />
            <ViewEventDate dateStart={data.dateStart} dateEnd={data.dateEnd} />
          </SContainer>

          <ViewEventLocation type={data.type} locationUrl={data.locationUrl} />
        </SContainer>

        <SContainer>
          <ViewEventDescription description={data.description} />

          <ViewEventInfo
            organizedBy={data.organizedBy}
            createdBy={data.createdBy}
            category={data.category}
          />

          <ViewEventActions event={data} />
        </SContainer>
      </SMainContainer>
    </>
  );
};

export default ViewEvent;
