type SeatLegendProps = {
  seatTypes: { name: string; color: string }[];
};

export default function SeatLegend({ seatTypes }: SeatLegendProps) {
  return (
    <div className="seat-legend z-10 flex flex-row items-start gap-2 p-4">
      {seatTypes.map((type) => (
        <div key={type.name} className="flex items-center gap-2">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: type.color }}
          ></div>
          <span>{type.name}</span>
        </div>
      ))}
    </div>
  );
}
