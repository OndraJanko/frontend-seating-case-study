import { TicketLegend } from "@/lib/types";

type SeatLegendProps = {
  seatTypes: TicketLegend[];
};

export default function SeatLegend({ seatTypes }: SeatLegendProps) {
  return (
    <div className="z-10 flex flex-row flex-wrap items-start gap-2 p-4">
      {seatTypes.map((type) => (
        <div key={type.name} className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: type.color }}
          />
          <span>{type.name}</span>
        </div>
      ))}
    </div>
  );
}
