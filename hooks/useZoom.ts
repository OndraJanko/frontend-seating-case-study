import { useState } from "react";

export function useZoom() {
  const defaultZoomLevelMD = 0.8;
  const defaultZoomLevelSM = 0.5;
  const [zoomLevel, setZoomLevel] = useState(defaultZoomLevelMD);
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(defaultZoomLevelMD);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.2));
  const handleResetZoom = () => {
    setZoomLevel(defaultZoomLevel);
  };

  return {
    zoomLevel,
    defaultZoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    setDefaultZoomLevel,
    setZoomLevel,
    defaultZoomLevelMD,
    defaultZoomLevelSM,
  };
}
