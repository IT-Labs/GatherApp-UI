// hooks/methods
import { useGetEventRequestsQuery } from "services/api/gatherapp";
import useRecusivePagination from "hooks/useRecursivePagination";

// components
import Button from "components/Reusable/Button/Button";
import EventCard from "components/Reusable/EventCard/EventCard";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// types and constants
import { ButtonType } from "ts/enums/ButtonType";
import { EventStatusFilters } from "ts/enums/EventStatuses";

import DropdownActions from "ts/enums/DropdownActions";

// styles
import EventDropDown from "components/Reusable/EventDropDown/EventDropDown";
import {
  SEventsContainer,
  SNotificationMessage,
  LoadMoreButtonStyles,
} from "components/Requests/RequestsPage/styles";

type Props = {
  status: EventStatusFilters;
  page?: number;
};

function RequestsPage({ status, page = 1 }: Props) {
  const { isNextPageLoaded, handleLoadNextPage, isFirstPage } =
    useRecusivePagination({ page, resetPageOn: [status] });

  const { data, isError, isLoading, isSuccess } = useGetEventRequestsQuery({
    status,
    pageSize: 9,
    page,
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
      <SEventsContainer>
        {data.events.length
          ? data.events.map((event) => (
              <EventCard key={event.id} event={event}>
                <EventDropDown
                  event={event}
                  actions={
                    status === EventStatusFilters.Pending
                      ? [
                          DropdownActions.Approve,
                          DropdownActions.Decline,
                          DropdownActions.Edit,
                        ]
                      : undefined
                  }
                />
              </EventCard>
            ))
          : isFirstPage && (
              <SNotificationMessage
                message={`No ${status} events to display`}
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
      </SEventsContainer>
      {shouldLoadNextPage && isNextPageLoaded && (
        <RequestsPage page={page + 1} status={status} />
      )}
    </>
  );
}

export default RequestsPage;
