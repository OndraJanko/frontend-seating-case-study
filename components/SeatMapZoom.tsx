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
    <div className="z-10 mb-4 flex gap-2">
      <Button onClick={handleZoomOut}>-</Button>
      <Button onClick={handleZoomIn}>+</Button>
      <Button onClick={handleResetZoom}>Reset</Button>
    </div>
  );
}
