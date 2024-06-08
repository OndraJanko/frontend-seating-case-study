"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent } from "@/lib/fetchers";
import Image from "next/image";
import { Button } from "./ui/button";

export default function EventDetails() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["event"],
    queryFn: fetchEvent,
  });

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
      <Image
        src={data.headerImageUrl}
        alt="event image"
        width={400}
        height={200}
        className="rounded-md"
      />
      <h2 className="mb-5">{data.namePub}</h2>
      <p className="mb-5">{data.description}</p>
      <Button variant="default" className="md:text-2xl">
        Add to calendar
      </Button>
    </div>
  );
}
