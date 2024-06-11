import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event, ProcessedSeat } from "@/lib/types";

export default function useEvent() {
  const queryClient = useQueryClient();
  const initialStateEvent = queryClient.getQueryData<Event>(["event"]);

  const eventQuery = useQuery<Event>({
    queryKey: ["event"],
    queryFn: fetchEvent,
    staleTime: 60 * 1000, // Adjust based on your needs
    initialData: initialStateEvent,
  });

  const eventID = eventQuery.data?.eventId;
  const initialStateSeats = eventID
    ? queryClient.getQueryData<ProcessedSeat[]>(["seats", eventID])
    : undefined;

  const seatsQuery = useQuery<ProcessedSeat[]>({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID!),
    enabled: !!eventID,
    staleTime: 60 * 1000, // Adjust based on your needs
    initialData: initialStateSeats,
  });

  const currencyIso = eventQuery.data?.currencyIso || "";

  return { eventQuery, seatsQuery, currencyIso };
}
