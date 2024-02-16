// hooks/methods
import { Link } from "react-router-dom";

// components
import {
  DateToDayjsObj,
  createDateRangeString,
  splitCamelCase,
} from "utils/helpers";

// types and constants
import { SingleEvent } from "ts/types/Event";

// styles
import {
  ActionsContainer,
  BannerImage,
  BannerSection,
  CategoriesAndButtons,
  DateDiv,
  SCard,
  SCardTitle,
  SCategoryTag,
  SDateParagraph,
  SDescription,
  SpanDate,
  TextSection,
} from "./styles";

type Props = {
  event: SingleEvent;
  isGridView?: boolean;
  isHomePage?: boolean;
  children?: any;
};

const EventCard = ({
  event,
  isGridView = false,
  isHomePage = false,
  children,
}: Props) => {
  const { id, banner, dateStart, dateEnd, title, locationUrl, type, category } =
    event;
  const startDate = DateToDayjsObj(dateStart);
  const endDate = DateToDayjsObj(dateEnd);
  const url = `/events/${id}`;

  return (
    <SCard isGridView={isGridView} key={event.id}>
      <Link to={url}>
        <BannerSection isGridView={isGridView}>
          <BannerImage src={banner} />
          <DateDiv>
            <SDateParagraph>
              <SpanDate>{startDate.date()}</SpanDate>
              {startDate.format("MMM")}
            </SDateParagraph>
          </DateDiv>
        </BannerSection>

        <TextSection>
          <SCardTitle>{title}</SCardTitle>

          <SDescription>
            {createDateRangeString(startDate, endDate)}
          </SDescription>
          <SDescription>{locationUrl}</SDescription>
          <CategoriesAndButtons
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            isGridView={isGridView}
          >
            <ActionsContainer isGridView={isGridView}>
              <SCategoryTag>{splitCamelCase(category)}</SCategoryTag>
              <SCategoryTag>{type}</SCategoryTag>
            </ActionsContainer>
            {isHomePage && children}
          </CategoriesAndButtons>
        </TextSection>
      </Link>
      {!isHomePage && children}
    </SCard>
  );
};

export default EventCard;
