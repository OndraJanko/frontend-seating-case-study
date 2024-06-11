import { Button } from "./ui/button";

type ZoomControlProps = {
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  handleResetZoom: () => void;
};
export default function SeatMapZoom({
  handleZoomOut,
  handleZoomIn,
  handleResetZoom,
}: ZoomControlProps) {
  return (
    <div className="z-10 mb-4 flex gap-2 px-4">
      <Button onClick={handleZoomOut} aria-label="-">
        -
      </Button>
      <Button onClick={handleZoomIn} aria-label="+">
        +
      </Button>
      <Button onClick={handleResetZoom} aria-label="Reset">
        Reset
      </Button>
    </div>
  );
}
