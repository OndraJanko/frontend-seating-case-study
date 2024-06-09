import {
  Event,
  EventTicketsResponse,
  Seat,
  Ticket,
  SeatRow,
} from "@/lib/types";
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
): Promise<
  (Seat & { price: number; ticketTypeName: string; seatRow: number })[]
> {
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }

  const { data } = await axios.get<EventTicketsResponse>(
    `${apiUrl}/event-tickets?eventId=${eventId}`,
  );

  const { ticketTypes, seatRows } = data;

  // Map of ticketTypeId to Ticket
  const ticketTypeMap: Record<string, Ticket> = {};
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
