"use client";
import EventDetails from "@/components/EventDetails";
import EventSeats from "@/components/EventSeats";

export default function EventContainer() {
  return (
    <div className="flex w-full flex-col gap-5 px-5 py-8 md:flex-row lg:px-20">
      <div className="relative flex h-full w-full md:w-1/3">
        <EventDetails />
        <div className="absolute left-[-5px] top-[-5px] z-0 h-full w-full rounded-md bg-gradient-to-bl from-gradient-start via-gradient-middle to-gradient-end md:left-[-10px] md:top-[-10px] lg:left-[-20px] lg:top-[-20px]" />
      </div>
      <div className="relative flex h-full w-full md:w-2/3">
        <EventSeats />
        <div className="absolute bottom-[-5px] right-[-5px] z-0 h-full w-full rounded-md bg-gradient-to-bl from-gradient-start via-gradient-middle to-gradient-end md:bottom-[-10px] md:right-[-10px] lg:bottom-[-20px] lg:right-[-20px]" />
      </div>
    </div>
  );
}
