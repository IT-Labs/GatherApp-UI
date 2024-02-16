// hooks
import { useEffect, useState } from "react";
import { useGetMyEventsQuery } from "services/api/gatherapp";
import { useAppSelector } from "store/store";

// libraries
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// utils
import { DateToDayjsObj } from "utils/helpers";

// types and constants
import { SingleEvent } from "ts/types/Event";

// styles
import { SCalendar } from "components/Calendar/styles";

const formatTime = (date: Date) => {
  const localDate = DateToDayjsObj(date);

  const dateFormat = "HH:mm";

  return localDate.format(dateFormat);
};

const Calendar = () => {
  const [eventsDetails, setEventsDetails] = useState<SingleEvent[] | null>(
    null
  );
  const userId = useAppSelector((state) => state.login.user.id);

  const handleEventClick = (info: any) => {
    const newTab = window.open(`/events/${info.event.id}`, "_blank");
    // there's a security issue when opening new windows/tabs; good protection is adding a third arg "noopener noreferrer"
    // the problem with adding the third arg here is it opens a whole new window instead of a new tab; setting opener to null should work as well
    if (newTab) newTab.opener = null;
  };

  const { data, isLoading, isError } = useGetMyEventsQuery({ userId });

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setEventsDetails(data);
    }
  }, [data]);

  const [view, setView] = useState<string>(
    localStorage.getItem("calendarView") || "dayGridMonth"
  );

  const handleWindowResize = () => {
    setView(window.innerWidth < 768 ? "dayGridDay" : "dayGridMonth");
  };

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("calendarView", view);
  }, [view]);

  return (
    <SCalendar>
      <FullCalendar
        height="auto"
        handleWindowResize
        plugins={[dayGridPlugin]}
        initialView={view}
        events={eventsDetails?.map((event: SingleEvent) => ({
          title: event.title,
          start: event.dateStart,
          end: event.dateEnd,
          id: event.id,
        }))}
        dayMaxEvents={1}
        eventClick={handleEventClick}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        eventContent={(arg) => {
          if (arg.event.start && arg.event.end) {
            if (arg.isEnd && !arg.isStart) {
              arg.timeText = formatTime(arg.event.end);
            } else {
              arg.timeText = formatTime(arg.event.start);
            }
          }
          return true; // render default content
        }}
      />
    </SCalendar>
  );
};

export default Calendar;
