import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setEvent } from "@/store/eventSlice";
import { fetchEvent, fetchEventSeats } from "@/lib/fetchers";

export function useEvent() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const eventQuery = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

  const eventID = eventQuery.data?.eventId;

  useEffect(() => {
    if (eventQuery.data) {
      dispatch(setEvent(eventQuery.data));
    }
  }, [dispatch, eventQuery.data]);

  const seatsQuery = useQuery({
    queryKey: ["seats", eventID],
    queryFn: () => fetchEventSeats(eventID as string),
    enabled: !!eventID,
  });

  return { eventQuery, seatsQuery };
}
