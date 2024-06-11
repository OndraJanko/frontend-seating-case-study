import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";
import { useQuery } from "@tanstack/react-query";
import { Event, ProcessedTicketResponse } from "@/lib/types";

export default function useEvent() {
  const eventQuery = useQuery<Event>({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  const eventID = eventQuery.data?.eventId;

  const seatsQuery = useQuery<ProcessedTicketResponse>({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID as string),
    enabled: !!eventID,
  });

  const currencyIso = eventQuery.data?.currencyIso || "";
  const maxPlacesPerRow = seatsQuery.data
    ? Math.max(...seatsQuery.data?.processedSeats?.map((seat) => seat.place))
    : 0;

  return { eventQuery, seatsQuery, currencyIso, maxPlacesPerRow };
}
