"use client";
import useEvent from "@/hooks/useEvent";
import SeatMapZoom from "./SeatMapZoom";
import SeatLegend from "./SeatLegend";
import { useZoom } from "@/hooks/useZoom";
import { processSeatRows } from "@/lib/seatUtils";
import SeatRow from "./SeatRow";
import { useEffect } from "react";
import { useRef } from "react";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
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
    return <div>Loading seats...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No seats available</div>;
  }

  const { sortedSeatRows, maxColumns } = processSeatRows(data);

  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-auto rounded-md px-2 py-4 md:px-3 md:py-5">
      <SeatLegend seatTypes={seatTypes} />
      <SeatMapZoom
        handleZoomOut={handleZoomOut}
        handleZoomIn={handleZoomIn}
        handleResetZoom={handleResetZoom}
      />
      <div
        className="transition-transform duration-300 ease-in-out"
        ref={divRef}
        style={{
          transformOrigin: "center",
          transform: `scale(${zoomLevel})`,
        }}
      >
        {sortedSeatRows.map(({ row, seats }) => (
          <SeatRow key={row} row={row} seats={seats} maxColumns={maxColumns} />
        ))}
      </div>
    </div>
  );
}
