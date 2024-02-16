import styled from "styled-components";

export const SCalendar = styled.div`
  --primary-color: #26a1a9;
  --secondary-color: #68747b;
  --bg-color: #f0f4f8;
  --secondary-color-green: #3ca94a;
  --white: #eeeeee;

  flex: 1 1 auto;

  .calendar-container {
    position: relative;
    color: var(--white);
    border-radius: var(--primary-border-radius);
    background-image: url("images/desktop-bg.png");
    background-size: cover;
    background-position: center;
  }

  .fc-daygrid {
    box-shadow: rgba(0, 0, 0, 0.3) 0 1.188rem 2.375rem,
      rgba(0, 0, 0, 0.22) 0 0.938rem 0.75rem;
  }

  .fc-toolbar {
    border: none;
    box-shadow: none;
    margin-bottom: 1.25rem;

    .fc-toolbar-title {
      font-weight: bold;
      font-size: 1.5rem;
      color: var(--white);

      @media screen and (max-width: 55rem) {
        font-size: 0.7rem;
      }
    }

    .fc-button-primary {
      background-color: var(--primary-color-green);
      border-color: var(--primary-color-green);
      color: var(--white);

      &:hover {
        background-color: darken(var(--primary-color), 10%);
        border-color: darken(var(--primary-color), 10%);
      }
    }

    .fc-button-secondary {
      background-color: var(--secondary-color);
      border-color: var(--secondary-color);
      color: var(--secondary-color-green);

      &:hover {
        background-color: darken(var(--secondary-color), 10%);
        border-color: darken(var(--secondary-color), 10%);
      }
    }
  }

  .fc-col-header-cell {
    background-color: var(--secondary-color-grey);
    color: var(--white);
  }

  .fc-popover {
    border-radius: var(--primary-border-radius);
  }

  .fc-popover-header {
    color: var(--primary-color-green);
    font-weight: bold;
    font-size: 1rem;

    @media screen and (max-width: 48.75rem) {
      font-size: 0.9rem;
    }
  }

  .fc-daygrid-day,
  .fc-daygrid-day-frame {
    height: 5.625rem;
  }

  .fc-day-top {
    height: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &.fc-today {
      background-color: var(--secondary-color);
      color: var(--white);
      border-radius: 50%;
    }

    @media screen and (max-width: 48.75rem) {
      font-size: 0.9rem;
    }
  }

  .fc-daygrid-dot-event {
    display: grid;
    grid-template-rows: 0.938rem 0.938rem;
    grid-template-columns: 0.938rem repeat(3, auto);
  }

  .fc-event {
    background-color: var(--primary-color-green);
    color: var(--white);
    border-radius: 0.625rem;
    border: none;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    padding: 0.188rem;
    cursor: pointer;
    margin-bottom: 0.313rem;
    overflow: hidden;
    white-space: normal;

    &:hover {
      z-index: 99;
      background-color: var(--primary-color);
    }

    @media screen and (max-width: 48.75rem) {
      font-size: 0.8rem;
    }
  }

  .fc-event-main-frame {
    display: grid;
    grid-template-rows: 0.938rem 0.938rem;
    grid-template-columns: 0.938rem repeat(3, auto);
  }

  .fc-daygrid-event-dot {
    grid-row: 1;
    grid-column: 1;
  }

  .fc-event-title,
  .fc-event-title-container {
    grid-row: 2 / 3;
    grid-column: 1 / 4;

    font-size: 0.7rem;
    color: var(--white);
    width: 100%;
    height: 0.7rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 20ch;

    @media screen and (max-width: 48.75rem) {
      font-size: 0.6rem;
    }
  }

  .fc-event-time {
    grid-row: 1 / 2;

    font-size: 0.7rem;
    color: var(--white);

    @media screen and (max-width: 48.75rem) {
      font-size: 0.6rem;
    }
  }

  .fc-event-main-frame .fc-event-time {
    grid-column: 1 / 4;
  }

  .fc-event-selected {
    background-color: var(--secondary-color-green);
    color: var(--white);
    border-radius: 0.625rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
    padding: 0.625rem;
    margin-bottom: 0.313rem;
  }
`;
