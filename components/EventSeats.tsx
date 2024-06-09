"use client";
import { useEvent } from "@/lib/hooks";
import Seat from "./Seat";
import { Seat as SeatType } from "@/lib/types";
import { useState } from "react";
import SeatMapZoom from "./SeatMapZoom";
import SeatLegend from "./SeatLegend";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
  } = useEvent();

  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.2, 0.2));
  const handleResetZoom = () => setZoomLevel(1);
  const seatTypes = [
    { name: "VIP", color: "gold" },
    { name: "Regular", color: "silver" },
    { name: "Taken", color: "black" },
  ];

  if (isLoading) {
    return <div>Loading seats...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No seats available</div>;
  }

  const seatRows = data.reduce(
    (acc, seat) => {
      if (!acc[seat.seatRow]) {
        acc[seat.seatRow] = [];
      }
      acc[seat.seatRow].push(seat);
      return acc;
    },
    {} as Record<
      number,
      (SeatType & { price: number; ticketTypeName: string; seatRow: number })[]
    >,
  );

  const sortedSeatRows = Object.keys(seatRows)
    .sort((a, b) => Number(a) - Number(b))
    .map((row) => {
      const sortedSeats = seatRows[Number(row)].sort(
        (a, b) => a.place - b.place,
      );
      return { row: Number(row), seats: sortedSeats };
    });

  const maxColumns = Math.max(
    ...sortedSeatRows.map(({ seats }) => seats[seats.length - 1].place),
  );

  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md px-2 py-4 md:px-3 md:py-5">
      <SeatLegend seatTypes={seatTypes} />
      <SeatMapZoom
        handleZoomOut={handleZoomOut}
        handleZoomIn={handleZoomIn}
        handleResetZoom={handleResetZoom}
      />
      <div
        className="transition-transform duration-300 ease-in-out"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center" }}
      >
        {sortedSeatRows.map(({ row, seats }) => {
          const seatsWithGaps = Array.from(
            { length: maxColumns },
            (_, index) => {
              const place = index + 1;
              const seat = seats.find((seat) => seat.place === place);
              return seat
                ? seat
                : {
                    seatId: `Taken-${row}-${place}`,
                    place,
                    seatRow: row,
                    price: 0,
                    ticketTypeName: "Taken",
                  };
            },
          );
          /* rows */
          return (
            <div
              key={row}
              className="mb-2"
              style={{
                display: "grid",
                gridTemplateColumns: `minmax(20px, auto) repeat(${maxColumns}, minmax(40px, 1fr)) minmax(20px, auto)`,
                gap: "0.5rem",
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center font-bold text-black">
                {row}
              </div>
              {/* seats */}
              {seatsWithGaps.map((seat) => (
                <Seat
                  key={seat.seatId}
                  id={seat.seatId}
                  place={seat.place}
                  seatRow={seat.seatRow}
                  price={seat.price}
                  ticketTypeName={seat.ticketTypeName}
                />
              ))}
              <div className="flex h-10 w-10 items-center justify-center font-bold text-black">
                {row}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
