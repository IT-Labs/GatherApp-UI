import { LoadMore } from "components/Reusable/GeneralStyles/LoadMore";
import { NotificationMessage } from "components/Reusable/NotificationMessage/NotificationMessage";
import styled from "styled-components";

export const SEventsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 auto;
  gap: 1rem;
  color: var(--secondary-font-color);
  padding-bottom: 1rem;
`;

export const SNotificationMessage = styled(NotificationMessage)`
  margin-top: 1.5rem;
`;

export const LoadMoreButtonStyles = {
  ...LoadMore,
  width: "8rem",
};
