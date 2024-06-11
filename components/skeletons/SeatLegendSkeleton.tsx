import { Skeleton } from "@/components/ui/skeleton";

export default function SeatLegendSkeleton() {
  return (
    <div className="z-10 flex flex-row items-start gap-2 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
