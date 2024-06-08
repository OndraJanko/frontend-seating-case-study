"use client";
import { Button } from "./ui/button";

export default function EventDetails() {
  return (
    <div className="white_bg z-[1] flex h-full w-full flex-col rounded-md px-7 py-9">
      <div className="mb-10 h-[200px] w-full max-w-[400px] rounded-md bg-black">
        image here
      </div>
      <h2 className="mb-5">Event Name</h2>
      <p className="mb-5">
        Event description event details event details event details event
        details event details event details event details event details Event
        description event details event details event details event details
        event details event details event details event details Event
      </p>
      <Button
        variant="default"
        className="md:text-2xl"
        onClick={() => {
          console.log("add to calendar");
        }}
      >
        Add to calendar
      </Button>
    </div>
  );
}
