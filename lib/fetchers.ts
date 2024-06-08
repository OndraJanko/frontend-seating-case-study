import { Event } from "@/types/types";
import axios from "axios";

export async function fetchEvent(): Promise<Event> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error("API_URL is not set");
  }
  const { data } = await axios.get<Event>(`${apiUrl}/event`);
  return data;
}
