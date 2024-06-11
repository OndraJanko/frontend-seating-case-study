import { Skeleton } from "@/components/ui/skeleton";

export default function SeatMapSkeleton() {
  return (
    <div
      className="transition-transform duration-300 ease-in-out"
      style={{ transformOrigin: "center", transform: "scale(0.5)" }}
    >
      {[...Array(5)].map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="mb-2"
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(40px, auto) repeat(10, minmax(40px, 1fr)) minmax(40px, auto)`,
            gap: "0.5rem",
          }}
        >
          <Skeleton className="h-10 w-10" />
          {[...Array(10)].map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-10 w-10 rounded-full" />
          ))}
          <Skeleton className="h-10 w-10" />
        </div>
      ))}
    </div>
  );
}
