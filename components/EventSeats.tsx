"use client";
import useEvent from "@/hooks/useEvent";
import SeatMapZoom from "./SeatMapZoom";
import SeatLegend from "./SeatLegend";
import { useZoom } from "@/hooks/useZoom";
import { processSeatRows } from "@/lib/seatUtils";
import SeatRow from "./SeatRow";
import { useRef, useMemo, useEffect, useCallback } from "react";
import EventSeatsSkeleton from "./skeletons/EventSeatsSkeleton";
import { debounce } from "lodash";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
    eventQuery: { isLoading: isEventLoading },
    maxPlacesPerRow,
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

  const adjustZoomLevel = useCallback(() => {
    const width = window.innerWidth;
    let baseZoomLevel = 0.8;
    if (maxPlacesPerRow > 10) {
      baseZoomLevel -= 0.1;
    } else if (maxPlacesPerRow > 12) {
      baseZoomLevel -= 0.2;
    } else if (maxPlacesPerRow > 14) {
      baseZoomLevel -= 0.3;
    } else if (maxPlacesPerRow > 15) {
      baseZoomLevel -= 0.4;
    } else if (maxPlacesPerRow > 16) {
      baseZoomLevel -= 0.5;
    }
    if (width <= 768) {
      setDefaultZoomLevel(baseZoomLevel * 0.6);
      setZoomLevel(baseZoomLevel * 0.6);
    } else if (width <= 1024) {
      setDefaultZoomLevel(baseZoomLevel * 0.85);
      setZoomLevel(baseZoomLevel * 0.85);
    } else {
      setDefaultZoomLevel(baseZoomLevel);
      setZoomLevel(baseZoomLevel);
    }
  }, [maxPlacesPerRow, setDefaultZoomLevel, setZoomLevel]);

  const debouncedAdjustZoomLevel = useMemo(
    () => debounce(adjustZoomLevel, 100),
    [adjustZoomLevel],
  );

  useEffect(() => {
    debouncedAdjustZoomLevel();
    window.addEventListener("resize", debouncedAdjustZoomLevel);
    return () => {
      window.removeEventListener("resize", debouncedAdjustZoomLevel);
      debouncedAdjustZoomLevel.cancel();
    };
  }, [debouncedAdjustZoomLevel]);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.transform = `scale(${zoomLevel})`;
    }
  }, [zoomLevel]);

  const getColor = useMemo(
    () => (ticketTypeName: string) => {
      switch (ticketTypeName) {
        case "VIP ticket":
          return "gold";
        case "Regular ticket":
          return "silver";
        default:
          return "gray";
      }
    },
    [],
  );

  const seatTypes = useMemo(
    () => [
      ...(data?.ticketTypes.map((type) => ({
        name: type.name,
        color: getColor(type.name),
      })) || []),
      { name: "Taken", color: "black" },
    ],
    [data, getColor],
  );

  if (isLoading) {
    return <EventSeatsSkeleton />;
  }

  if (error) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-red-600">
          Error loading event seats
        </div>
        <p className="text-md text-gray-600">Please try again later</p>
      </div>
    );
  }

  if (!data && !isEventLoading) {
    return (
      <div className="white_bg z-[1] flex h-[400px] w-full flex-col items-center justify-center rounded-md px-2 py-4 md:px-3 md:py-5">
        <div className="text-xl font-bold text-gray-600">
          No seats available
        </div>
        <p className="text-md text-gray-600">Please check back later</p>
      </div>
    );
  }
  if (!data) return <EventSeatsSkeleton />;

  const { sortedSeatRows } = processSeatRows(data.processedSeats);

  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md px-2 pt-[150px] md:px-3 md:pb-[70px]">
      <div className="absolute left-1 top-1 flex w-full flex-col justify-center md:left-4 md:top-3">
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
            maxColumns={maxPlacesPerRow}
          />
        ))}
      </div>
    </div>
  );
}
