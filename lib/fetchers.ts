import {
  Event,
  EventTicketsResponse,
  ProcessedSeat,
  SeatRow,
  Seat,
  TicketResponse,
} from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("API_URL is not set");
}

export async function fetchEvent(): Promise<Event> {
  try {
    console.log("Fetching event data from", `${apiUrl}/event`);
    const { data } = await axios.get<Event>(`${apiUrl}/event`);
    console.log("Fetched event data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching event data:", error);
    throw error;
  }
}

export async function fetchEventSeats(
  eventId: string,
): Promise<ProcessedSeat[]> {
  try {
    console.log("Fetching event seats for eventId:", eventId);
    const { data } = await axios.get<EventTicketsResponse>(
      `${apiUrl}/event-tickets?eventId=${eventId}`,
    );
    console.log("Fetched event seats data:", data);

    const { ticketTypes, seatRows } = data;

    const ticketTypeMap: Record<string, TicketResponse> = {};
    ticketTypes.forEach((ticketType) => {
      ticketTypeMap[ticketType.id] = ticketType;
    });

    const processedSeats = seatRows.flatMap((row: SeatRow) =>
      row.seats.map((seat: Seat) => ({
        ...seat,
        price: ticketTypeMap[seat.ticketTypeId].price,
        ticketTypeName: ticketTypeMap[seat.ticketTypeId].name,
        seatRow: row.seatRow,
      })),
    );

    return processedSeats;
  } catch (error) {
    console.error("Error fetching event seats data:", error);
    throw error;
  }
}

export async function preFetchData() {
  const queryClient = new QueryClient();
  try {
    console.log("Prefetching event data");
    await queryClient.prefetchQuery({
      queryKey: ["event"],
      queryFn: fetchEvent,
    });

    const eventData = queryClient.getQueryData<Event>(["event"]);
    console.log("Prefetched event data:", eventData);

    if (eventData && eventData.eventId) {
      console.log("Prefetching event seats for eventId:", eventData.eventId);
      await queryClient.prefetchQuery({
        queryKey: ["seats", eventData.eventId],
        queryFn: () => fetchEventSeats(eventData.eventId),
      });
    }

    return { eventData, queryClient };
  } catch (error) {
    console.error("Error during prefetching data:", error);
    throw error;
  }
}
