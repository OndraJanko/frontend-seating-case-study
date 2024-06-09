"use client";
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

  return (
    <div className="white_bg z-[1] flex h-full w-full flex-wrap items-center justify-center gap-1 rounded-md px-2 py-4 md:px-3 md:py-5">
      {data.map((seat) => (
        <Seat
          key={seat.seatId}
          id={seat.seatId}
          place={seat.place}
          seatRow={seat.seatRow}
          price={seat.price}
          ticketTypeName={seat.ticketTypeName}
        />
      ))}
    </div>
  );
}
