import { Seat as SeatType } from "@/lib/types";

export function processSeatRows(
  data:
    | (SeatType & {
        price: number;
        ticketTypeName: string;
        seatRow: number;
      })[]
    | undefined,
) {
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

  return { sortedSeatRows, maxColumns };
}
