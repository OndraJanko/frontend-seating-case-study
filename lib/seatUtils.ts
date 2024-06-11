import { ProcessedSeat } from "@/lib/types";

export function processSeatRows(data: Array<ProcessedSeat>) {
  // Group seats by their row number
  const seatRows = data.reduce(
    (acc, seat) => {
      // If the row does not exist in the accumulator, create an empty array for it
      if (!acc[seat.seatRow]) {
        acc[seat.seatRow] = [];
      }
      // Push the current seat into the corresponding row array
      acc[seat.seatRow].push(seat);
      return acc;
    },
    // Initialize the accumulator as an object with number keys and arrays of ProcessedSeat values
    {} as Record<number, ProcessedSeat[]>,
  );

  // Sort the rows and the seats within each row
  const sortedSeatRows = Object.keys(seatRows)
    // Sort row keys numerically
    .sort((a, b) => Number(a) - Number(b))
    .map((row) => {
      // Sort seats within the current row by their place number
      const sortedSeats = seatRows[Number(row)].sort(
        (a, b) => a.place - b.place,
      );
      // Return an object representing the row and its sorted seats
      return { row: Number(row), seats: sortedSeats };
    });

  const maxColumns = Math.max(
    ...sortedSeatRows.map(({ seats }) => seats[seats.length - 1].place),
  );

  return { sortedSeatRows, maxColumns };
}
