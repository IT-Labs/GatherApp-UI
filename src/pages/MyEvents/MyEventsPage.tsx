// hooks/methods
import { useGetMyCreatedEventsQuery } from "services/api/gatherapp";
import useRecusivePagination from "hooks/useRecursivePagination";

// components
import Button from "components/Reusable/Button/Button";
import EventCard from "components/Reusable/EventCard/EventCard";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import EventDropDown from "components/Reusable/EventDropDown/EventDropDown";

// types and constants
import { EventStatusFilters } from "ts/enums/EventStatuses";
import DropdownActions from "ts/enums/DropdownActions";
import { ButtonType } from "ts/enums/ButtonType";

// styles
import { LoadMoreButtonStyles, SContainer } from "pages/MyEvents/styles";
import { SNotificationMessage } from "components/Requests/RequestsPage/styles";

type Props = {
  eventStatus: EventStatusFilters;
  organizer: string;
  userId: string;
  page?: number;
};

const MyEventsPage = (props: Props) => {
  const { page = 1, userId, eventStatus, organizer } = props;

  const { isNextPageLoaded, handleLoadNextPage, isFirstPage } =
    useRecusivePagination({ page, resetPageOn: [eventStatus] });

  const { data, isLoading, isError, isSuccess } = useGetMyCreatedEventsQuery({
    page,
    userId,
    eventStatus,
    organizer,
    pageSize: 9,
  });

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );

  const shouldLoadNextPage = page < data.totalPageCount;

  return (
    <>
      <SContainer>
        {data.events.length
          ? data.events.map((event) => {
              return (
                <EventCard key={event.id} event={event}>
                  <EventDropDown
                    event={event}
                    actions={
                      eventStatus === EventStatusFilters.Past
                        ? [DropdownActions.Delete]
                        : undefined
                    }
                  />
                </EventCard>
              );
            })
          : isFirstPage && (
              <SNotificationMessage
                message={`No ${eventStatus.toLowerCase()} events`}
              />
            )}
        {shouldLoadNextPage && !isNextPageLoaded && (
          <Button
            onClick={handleLoadNextPage}
            buttonType={ButtonType.SOLID}
            customStyles={LoadMoreButtonStyles}
          >
            Load More
          </Button>
        )}
      </SContainer>
      {shouldLoadNextPage && isNextPageLoaded && (
        <MyEventsPage {...props} page={page + 1} />
      )}
    </>
  );
};

export default MyEventsPage;
