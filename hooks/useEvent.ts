import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event, ProcessedSeat } from "@/lib/types";

export default function useEvent() {
  const queryClient = useQueryClient();
  const initialStateEvent = queryClient.getQueryData(["event"]);
  const eventQuery = useQuery<Event>({
    queryKey: ["event"],
    queryFn: fetchEvent,
    staleTime: 60 * 1000,
    initialData: initialStateEvent! as Event,
  });

  const eventID = eventQuery.data?.eventId;

  const initialStateSeats = queryClient.getQueryData(["seats", eventID]);

  const seatsQuery = useQuery({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID as string),
    enabled: !!eventID,
    staleTime: 60 * 1000,
    initialData: initialStateSeats as ProcessedSeat[],
  });

  const currencyIso = eventQuery.data?.currencyIso || "";

  return { eventQuery, seatsQuery, currencyIso };
}
