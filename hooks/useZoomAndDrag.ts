import { useState, useEffect, useRef } from "react";
import { DraggableEvent, DraggableData } from "react-draggable";

export function useZoomAndDrag() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [defaultZoomLevel, setDefaultZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const draggableRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.1, 0.2));
  const handleResetZoom = () => {
    setZoomLevel(defaultZoomLevel);
    setPosition({ x: 0, y: 0 });
  };

  const handleDrag = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = ui;
    setPosition({ x, y });
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setDefaultZoomLevel(0.5);
      setZoomLevel(0.5);
    } else {
      setDefaultZoomLevel(1);
      setZoomLevel(1);
    }
  }, []);

  useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current.style.transform = `scale(${zoomLevel})`;
    }
  }, [zoomLevel]);

  return {
    zoomLevel,
    defaultZoomLevel,
    position,
    draggableRef,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleDrag,
  };
}
