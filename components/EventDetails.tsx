"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEvent } from "@/lib/hooks";
import { useEffect } from "react";
import { formatDateRange } from "@/lib/utils";

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
    return (
      <div className="white_bg z-[1] flex h-full w-full flex-col rounded-md px-7 py-9">
        <div className="mb-10 h-[200px] w-full max-w-[400px] rounded-md bg-black">
          image here
        </div>
        <h2 className="mb-5">Loading</h2>
        <p className="mb-5">Loading</p>
        <Button variant="default" className="md:text-2xl">
          Add to calendar
        </Button>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="white_bg z-[1] flex h-full w-full flex-col rounded-md px-7 py-9">
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
