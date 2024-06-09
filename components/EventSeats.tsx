"use client";
import useEvent from "@/hooks/useEvent";
import SeatMapZoom from "./SeatMapZoom";
import SeatLegend from "./SeatLegend";
import Draggable from "react-draggable";
import { useZoomAndDrag } from "@/hooks/useZoomAndDrag";
import { processSeatRows } from "@/lib/seatUtils";
import SeatRow from "./SeatRow";

export default function EventSeats() {
  const {
    seatsQuery: { data, isLoading, error },
  } = useEvent();

  const {
    zoomLevel,
    position,
    draggableRef,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleDrag,
  } = useZoomAndDrag();

  const seatTypes = [
    { name: "VIP", color: "gold" },
    { name: "Regular", color: "silver" },
    { name: "Taken", color: "black" },
  ];

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
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md px-2 py-4 md:px-3 md:py-5">
      <SeatLegend seatTypes={seatTypes} />
      <SeatMapZoom
        handleZoomOut={handleZoomOut}
        handleZoomIn={handleZoomIn}
        handleResetZoom={handleResetZoom}
      />
      <Draggable position={position} onDrag={handleDrag} nodeRef={draggableRef}>
        <div
          className="transition-transform duration-300 ease-in-out"
          ref={draggableRef}
          style={{
            transformOrigin: "center",
          }}
        >
          {sortedSeatRows.map(({ row, seats }) => (
            <SeatRow
              key={row}
              row={row}
              seats={seats}
              maxColumns={maxColumns}
            />
          ))}
        </div>
      </Draggable>
    </div>
  );
}
