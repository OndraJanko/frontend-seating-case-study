import TicketCheckout from "@/components/TicketCheckout";
import EventDetails from "@/components/EventDetails";
import EventSeats from "@/components/EventSeats";
import Signature from "@/components/Signature";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { preFetchData } from "@/lib/fetchers";

export async function generateMetadata(): Promise<Metadata> {
  const { eventData } = await preFetchData();

  return {
    title: eventData
      ? "Event Seating App " + eventData.namePub
      : "Event Seating App",
    description:
      eventData?.description ||
      "Easily purchase tickets for your favorite events with our seating map. Choose your seats and buy tickets securely online.",
    keywords: "event tickets, buy tickets, seating map, online ticket purchase",
  };
}

export default async function Home() {
  const { queryClient } = await preFetchData();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex w-full flex-col gap-5 overflow-x-hidden px-3 py-8 md:flex-row md:px-5 lg:px-20">
        <div className="relative flex h-full w-full md:w-1/3">
          <EventDetails />
          <div className="gradient_bg absolute left-[-5px] top-[-5px] z-0 h-full w-full rounded-md md:left-[-10px] md:top-[-10px] lg:left-[-20px] lg:top-[-20px]" />
        </div>
        <div className="relative flex h-full w-full flex-col gap-10 md:w-2/3">
          <div className="relative flex h-full w-full flex-col">
            <EventSeats />
            <div className="gradient_bg absolute bottom-[-5px] right-[-5px] z-0 h-full w-full rounded-md md:bottom-[-10px] md:right-[-10px] lg:bottom-[-20px] lg:right-[-20px]" />
          </div>
          <TicketCheckout />
          <div className="flex items-center justify-center md:hidden">
            <Signature />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
