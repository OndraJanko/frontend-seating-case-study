import { Skeleton } from "@/components/ui/skeleton";

export default function TicketCheckoutSkeleton() {
  return (
    <div className="white_bg flex flex-row items-center justify-between gap-2 rounded-md px-4 py-4 md:px-9 md:py-5">
      {/* Ticket info */}
      <div className="flex flex-col items-start justify-center gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-20" />
      </div>
      {/* Checkout button */}
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
