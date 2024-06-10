import {
  Event,
  EventTicketsResponse,
  Seat,
  Ticket,
  SeatRow,
  ProcessedSeat,
  LoginResponse,
} from "@/lib/types";
import axios, { AxiosResponse } from "axios";
import { LoginFormInputs } from "./validationSchemas";

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

  console.log(data);
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

export async function fetchUser(
  data: LoginFormInputs,
): Promise<AxiosResponse<LoginResponse>> {
  return axios.post<LoginResponse>(`${apiUrl}/login`, data);
}
