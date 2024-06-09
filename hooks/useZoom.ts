import { useState } from "react";

export function useZoom() {
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(0.8);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.2));
  const handleResetZoom = () => {
    setZoomLevel(defaultZoomLevel);
  };

  return {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    setDefaultZoomLevel,
    setZoomLevel,
  };
}
