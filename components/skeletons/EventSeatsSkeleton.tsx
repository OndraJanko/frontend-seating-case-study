import SeatLegendSkeleton from "./SeatLegendSkeleton";
import SeatMapSkeleton from "./SeatMapSkeleton";
import ZoomControlSkeleton from "./ZoomControlSkeleton";

export default function EventSeatsSkeleton() {
  return (
    <div className="white_bg z-[1] flex flex-col items-center justify-center gap-2 overflow-auto rounded-md px-2 pt-[150px] md:px-3 md:pb-[70px]">
      <div className="absolute left-5 top-5 flex w-full flex-col justify-center">
        <SeatLegendSkeleton />
        <ZoomControlSkeleton />
      </div>
      <SeatMapSkeleton />
    </div>
  );
}
