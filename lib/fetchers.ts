import {
  Event,
  EventTicketsResponse,
  Seat,
  TicketResponse,
  SeatRow,
  ProcessedSeat,
} from "@/lib/types";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEvent(): Promise<Event> {
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }
  const { data } = await axios.get<Event>(`${apiUrl}/event`);
  return data;
}

export async function fetchEventSeats(
  eventId: string,
): Promise<ProcessedSeat[]> {
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  const { data } = await axios.get<EventTicketsResponse>(
    `${apiUrl}/event-tickets?eventId=${eventId}`,
  );

  const { ticketTypes, seatRows } = data;

  // Map of ticketTypeId to TicketResponse
  const ticketTypeMap: Record<string, TicketResponse> = {};
  ticketTypes.forEach((ticketType) => {
    ticketTypeMap[ticketType.id] = ticketType;
  });

  // Flatten seatRows and add price, name, and seatRow to each seat
  const processedSeats = seatRows.flatMap((row: SeatRow) =>
    row.seats.map((seat: Seat) => ({
      ...seat,
      price: ticketTypeMap[seat.ticketTypeId].price,
      ticketTypeName: ticketTypeMap[seat.ticketTypeId].name,
      seatRow: row.seatRow,
    })),
  );

  return processedSeats;
}

export async function preFetchData() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["event"], queryFn: fetchEvent });

  const eventData = queryClient.getQueryData<Event>(["event"]);

  if (eventData && eventData.eventId) {
    await queryClient.prefetchQuery({
      queryKey: ["seats", eventData.eventId],
      queryFn: () => fetchEventSeats(eventData.eventId),
    });
  }

  return { eventData, queryClient };
}
