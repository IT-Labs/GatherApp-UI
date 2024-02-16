// hooks/methods
import { useGetAllEventsQuery } from "services/api/gatherapp";
import useRecusivePagination from "hooks/useRecursivePagination";

// components
import CTAButtons from "components/Reusable/CTAButtons/CTAButtons";
import EventCard from "components/Reusable/EventCard/EventCard";
import Button from "components/Reusable/Button/Button";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";

// types and constants
import { HomePageFilterState, SingleEvent } from "ts/types/Event";
import { ButtonType } from "ts/enums/ButtonType";

// styles
import {
  EventContainer,
  ButtonsContainer,
  LoadMoreButtonStyles,
  SContainer,
} from "components/EventPage/styles";
import { SNotificationMessage } from "components/Requests/RequestsPage/styles";

type Props = {
  page?: number;
  isGridView: boolean;
  filterState: NonNullable<HomePageFilterState>;
  haveFiltersChanged: boolean;
};

const EventPage = (props: Props) => {
  const { page = 1, isGridView, filterState, haveFiltersChanged } = props;

  const { isNextPageLoaded, handleLoadNextPage, isFirstPage } =
    useRecusivePagination({ page, resetPageOn: [Object.values(filterState)] });

  const { data, isError, isLoading, isSuccess } = useGetAllEventsQuery({
    pageSize: 9,
    page,
    ...filterState,
  });

  if (isLoading) return <NotificationMessage type="loading" />;
  if (isError || !isSuccess)
    return (
      <NotificationMessage
        type="error"
        message="Oops! Something went wrong :O"
      />
    );

  const noEventsMessage = haveFiltersChanged ? (
    <SNotificationMessage message="No Events Match those criteria" />
  ) : (
    <SNotificationMessage message="There are no events currently scheduled." />
  );

  const shouldLoadNextPage = page < data.totalPageCount;

  return (
    <>
      <SContainer>
        {data.events.length ? (
          <EventContainer isGridView={isGridView}>
            {data.events.map((event: SingleEvent) => (
              <EventCard
                key={event.id}
                event={event}
                isHomePage
                isGridView={isGridView}
              >
                <ButtonsContainer isGridView={isGridView}>
                  <CTAButtons event={event} isHomePage />
                </ButtonsContainer>
              </EventCard>
            ))}
          </EventContainer>
        ) : (
          isFirstPage && noEventsMessage
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
        <EventPage {...props} page={page + 1} />
      )}
    </>
  );
};

export default EventPage;
