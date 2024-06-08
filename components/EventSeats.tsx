"use client";
import { EventTicketsResponse } from "@/lib/types";
import { useEvent } from "@/lib/hooks";
import Seat from "./Seat";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
  } = useEvent();

  if (isLoading) {
    return <div>Loading seats...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No seats available</div>;
  }

  console.log(data);
  return (
    <div className="white_bg relative z-[1] flex h-full w-full flex-wrap gap-1 rounded-md px-7 py-9 pb-24">
      {data.seatRows.map((row) =>
        row.seats.map((seat) => <Seat key={seat.seatId} {...seat} />),
      )}
    </div>
  );
}
