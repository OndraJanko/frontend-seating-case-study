"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import useEvent from "@/hooks/useEvent";
import { useEffect } from "react";
import { formatDateRange } from "@/lib/dateUtils";
import SkeletonEventDetails from "./skeletons/SkeletonEventDetails";

export default function EventDetails() {
  const {
    eventQuery: { data, isLoading, error },
  } = useEvent();

  useEffect(() => {
    if (data) {
      document.title = `Event Seating App - ${data.namePub}`;
    }
  }, [data]);

  if (isLoading) {
    return <SkeletonEventDetails />;
  }

  if (error) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-red-600">
          Error loading event details
        </div>
        <p className="text-md text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-gray-600">
          No event details available
        </div>
        <p className="text-md text-gray-600">Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="white_bg z-[1] flex h-full w-full flex-col rounded-md px-2 py-4 md:px-3 md:py-5">
      <h1 className="mb-5 text-xl font-bold">{data.namePub}</h1>
      <Image
        src={data.headerImageUrl}
        alt="Image of the event"
        width={500}
        height={200}
        className="mb-3 rounded-md"
      />
      <section>
        <h2 className="text-lg font-bold">About</h2>
        <p className="mb-5">{data.description}</p>
      </section>
      <section>
        <h2 className="text-lg font-bold">At</h2>
        <p className="mb-5">{data.place}</p>
      </section>
      <section>
        <h2 className="text-lg font-bold">Date</h2>
        <p className="mb-5">{formatDateRange(data.dateFrom, data.dateTo)}</p>
      </section>
      <Button variant="default" className="md:text-xl">
        Add to calendar
      </Button>
    </div>
  );
}
