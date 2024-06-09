import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";
import { useQuery } from "@tanstack/react-query";

export default function useEvent() {
  const eventQuery = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  const eventID = eventQuery.data?.eventId;

  const seatsQuery = useQuery({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID as string),
    enabled: !!eventID,
  });

  const currencyIso = eventQuery.data?.currencyIso || "";

  return { eventQuery, seatsQuery, currencyIso };
}
