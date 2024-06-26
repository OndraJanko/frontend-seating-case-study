import {
  Event,
  EventTicketsResponse,
  TicketResponse,
  SeatRow,
  ProcessedSeat,
  ProcessedTicketResponse,
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
): Promise<ProcessedTicketResponse> {
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  const { data } = await axios.get<EventTicketsResponse>(
    `${apiUrl}/event-tickets?eventId=${eventId}`,
  );

  const { ticketTypes, seatRows } = data;

  const ticketTypeMap: Record<string, TicketResponse> = {};
  ticketTypes.forEach((ticketType) => {
    ticketTypeMap[ticketType.id] = ticketType;
  });

  const processedSeats = seatRows.flatMap((row: SeatRow) => {
    return row.seats.map((seat) => ({
      ...seat,
      price: ticketTypeMap[seat.ticketTypeId].price,
      ticketTypeName: ticketTypeMap[seat.ticketTypeId].name,
      seatRow: row.seatRow,
    }));
  });

  return { processedSeats, ticketTypes };
}

export async function preFetchData() {
  const queryClient = new QueryClient();

  // Fetch event data and store in query client
  await queryClient.prefetchQuery({ queryKey: ["event"], queryFn: fetchEvent });
  const eventData = queryClient.getQueryData<Event>(["event"]);

  // Fetch seats data if eventId is available and store in query client
  let seatsData = null;
  if (eventData && eventData.eventId) {
    await queryClient.prefetchQuery({
      queryKey: ["seats", eventData.eventId],
      queryFn: () => fetchEventSeats(eventData.eventId),
    });
    seatsData = queryClient.getQueryData<ProcessedSeat[]>([
      "seats",
      eventData.eventId,
    ]);
  }

  return { eventData, seatsData, queryClient };
}
