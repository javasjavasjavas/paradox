import { useCallback, useState, type PointerEvent } from "react";

export interface TiltPoint {
  x: number;
  y: number;
}

export function useMouseTilt(disabled = false) {
  const [tilt, setTilt] = useState<TiltPoint>({ x: 0, y: 0 });

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (disabled) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setTilt({ x, y });
    },
    [disabled],
  );

  const onPointerLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return { tilt, onPointerMove, onPointerLeave };
}
