import { Skeleton } from "@/components/ui/skeleton";
export default function ZoomControlSkeleton() {
  return (
    <div className="z-10 mb-4 flex gap-2 px-4">
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
      <Skeleton className="h-10 w-10" />
    </div>
  );
}
