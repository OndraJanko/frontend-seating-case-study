import Seat from "./Seat";
import { Seat as SeatType } from "@/lib/types";

type SeatRowProps = {
  row: number;
  seats: (SeatType & {
    price: number;
    ticketTypeName: string;
    seatRow: number;
  })[];
  maxColumns: number;
};

export default function SeatRow({ row, seats, maxColumns }: SeatRowProps) {
  const seatsWithGaps = Array.from({ length: maxColumns }, (_, index) => {
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
        />
      ))}
      <div className="flex h-10 w-10 items-center justify-center font-bold text-black">
        {row}
      </div>
    </div>
  );
}
