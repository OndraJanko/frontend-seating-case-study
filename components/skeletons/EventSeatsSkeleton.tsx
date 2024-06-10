import { Skeleton } from "@/components/ui/skeleton";

export default function EventSeatsSkeleton() {
  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-auto rounded-md px-2 pt-[150px] md:px-3 md:pb-[70px]">
      <div className="absolute left-5 top-5 flex w-full flex-col justify-center">
        <div className="seat-legend z-10 flex flex-row items-start gap-2 p-4">
          {["VIP", "Regular", "Taken"].map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
        <div className="z-10 mb-4 flex gap-2 px-4">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
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
    </div>
  );
}
