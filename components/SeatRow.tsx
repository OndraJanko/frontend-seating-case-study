import Seat from "./Seat";
import { ProcessedSeat } from "@/lib/types";

type SeatRowProps = {
  row: number;
  seats: ProcessedSeat[];
  maxColumns: number;
  currencyIso: string;
};

export default function SeatRow({
  row,
  seats,
  maxColumns,
  currencyIso,
}: SeatRowProps) {
  const seatsWithGaps = Array.from({ length: maxColumns }, (_, index) => {
    const place = index + 1;
    // Find the seat in the provided seats array that matches the current place
    const seat = seats.find((seat) => seat.place === place);
    // If the seat is found, return it; otherwise, return a "Taken" seat to fill the gap
    return seat
      ? seat
      : {
          seatId: `Taken-${row}-${place}`,
          place,
          seatRow: row,
          price: 0,
          ticketTypeName: "Taken",
          ticketTypeId: "",
        };
  });
  return (
    <div
      key={row}
      className="mb-2"
      style={{
        display: "grid",
        gridTemplateColumns: `minmax(40px, auto) repeat(${maxColumns}, minmax(40px, 1fr)) minmax(40px, auto)`,
        gap: "0.5rem",
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center font-bold text-black">
        {row}
      </div>
      {seatsWithGaps.map((seat) => (
        <Seat
          key={seat.seatId}
          id={seat.seatId}
          place={seat.place}
          seatRow={seat.seatRow}
          price={seat.price}
          ticketTypeName={seat.ticketTypeName}
          currencyIso={currencyIso}
          ticketTypeId={seat.ticketTypeId}
          seatId={seat.seatId}
        />
      ))}
      <div className="flex h-10 w-10 items-center justify-center font-bold text-black">
        {row}
      </div>
    </div>
  );
}
