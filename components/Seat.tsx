type SeatProps = {
  id: string;
  place: number;
  ticketTypeId: string;
  seatRow: number;
};
export default function Seat({ id, place, ticketTypeId, seatRow }: SeatProps) {
  return (
    <div className="transition-color flex size-12 items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200">
      <span className="text-md font-medium text-zinc-400">
        {seatRow + ";" + place}
      </span>
    </div>
  );
}
