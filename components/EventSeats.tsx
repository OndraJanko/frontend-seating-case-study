"use client";
import useEvent from "@/hooks/useEvent";
import SeatMapZoom from "./SeatMapZoom";
import SeatLegend from "./SeatLegend";
import { useZoom } from "@/hooks/useZoom";
import { processSeatRows } from "@/lib/seatUtils";
import SeatRow from "./SeatRow";
import { useEffect } from "react";
import { useRef } from "react";
import EventSeatsSkeleton from "./skeletons/EventSeatsSkeleton";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
    eventQuery: { isLoading: isEventLoading },
    currencyIso,
  } = useEvent();
  const {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    setDefaultZoomLevel,
    setZoomLevel,
  } = useZoom();
  const divRef = useRef<HTMLDivElement>(null);

  const seatTypes = [
    { name: "VIP", color: "gold" },
    { name: "Regular", color: "silver" },
    { name: "Taken", color: "black" },
  ];

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setDefaultZoomLevel(0.5);
      setZoomLevel(0.5);
    } else {
      setDefaultZoomLevel(0.8);
      setZoomLevel(0.8);
    }
  }, [setDefaultZoomLevel, setZoomLevel]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.transform = `scale(${zoomLevel})`;
    }
  }, [zoomLevel, divRef]);

  if (isLoading) {
    return <EventSeatsSkeleton />;
  }

  if (error) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-red-600">
          Error loading event seats
        </div>
        <p className="text-md text-gray-600">Please try again later.</p>
      </div>
    );
  }

  if (!data && !isEventLoading) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-gray-600">
          No seats available
        </div>
        <p className="text-md text-gray-600">Please check back later.</p>
      </div>
    );
  }
  if (!data) return <EventSeatsSkeleton />;

  const { sortedSeatRows, maxColumns } = processSeatRows(data);

  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-auto rounded-md px-2 pt-[150px] md:px-3 md:pb-[70px]">
      <div className="absolute left-5 top-5 flex w-full flex-col justify-center">
        <SeatLegend seatTypes={seatTypes} />
        <SeatMapZoom
          handleZoomOut={handleZoomOut}
          handleZoomIn={handleZoomIn}
          handleResetZoom={handleResetZoom}
        />
      </div>

      <div
        className="transition-transform duration-300 ease-in-out"
        ref={divRef}
        style={{
          transformOrigin: "center",
          transform: `scale(${zoomLevel})`,
        }}
      >
        {sortedSeatRows.map(({ row, seats }) => (
          <SeatRow
            key={row}
            row={row}
            seats={seats}
            maxColumns={maxColumns}
            currencyIso={currencyIso}
          />
        ))}
      </div>
    </div>
  );
}
