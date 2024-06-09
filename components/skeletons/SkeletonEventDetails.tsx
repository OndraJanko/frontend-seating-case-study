import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonEventDetails() {
  return (
    <div className="white_bg z-[1] flex h-full w-full flex-col rounded-md px-2 py-4 md:px-3 md:py-5">
      {/* Event title */}
      <Skeleton className="mb-5 h-8 w-2/3" />
      {/* Event image */}
      <Skeleton className="mb-3 h-56 w-full rounded-md" />
      {/* Event description */}
      <section>
        <Skeleton className="mb-2 h-6 w-1/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-1 h-4 w-5/6" />
        <Skeleton className="mb-1 h-4 w-5/6" />
        <Skeleton className="mb-1 h-4 w-4/6" />
        <Skeleton className="mb-5 h-4 w-3/6" />
      </section>
      {/* Event place */}
      <section>
        <Skeleton className="mb-2 h-6 w-1/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-5 h-4 w-5/6" />
      </section>
      {/* Event date */}
      <section>
        <Skeleton className="mb-2 h-6 w-1/4" />
        <Skeleton className="mb-1 h-4 w-full" />
        <Skeleton className="mb-5 h-4 w-3/4" />
      </section>
      {/* Add to calendar */}
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
