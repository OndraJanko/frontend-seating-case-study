import { Event, EventTicketsResponse } from "@/lib/types";
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
): Promise<EventTicketsResponse> {
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }
  const { data } = await axios.get<EventTicketsResponse>(
    `${apiUrl}/event-tickets?eventId=${eventId}`,
  );
  return data;
}
