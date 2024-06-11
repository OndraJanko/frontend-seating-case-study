import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";
import { useQuery } from "@tanstack/react-query";
import { Event, ProcessedSeat } from "@/lib/types";

export default function useEvent(initialEventData: any, initialSeatsData: any) {
  const eventQuery = useQuery<Event>({
    queryKey: ["event"],
    queryFn: fetchEvent,
    staleTime: 60 * 1000,
    initialData: initialEventData,
  });

  const eventID = eventQuery.data?.eventId;

  const seatsQuery = useQuery<ProcessedSeat[]>({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID as string),
    enabled: !!eventID,
    staleTime: 60 * 1000,
    initialData: initialSeatsData,
  });

  const currencyIso = eventQuery.data?.currencyIso || "";

  return { eventQuery, seatsQuery, currencyIso };
}
