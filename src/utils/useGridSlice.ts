import { RefObject, useState } from "react";
import useResizeObserverRef from "./useResizeObserverRef";

export function useGridSlice(
  cardRef: RefObject<HTMLDivElement>,
  initStep: number
) {
  const [step, setStep] = useState(initStep);

  const ref = useResizeObserverRef((entry: ResizeObserverEntry) => {
    const { width } = entry.contentRect;
    if (cardRef && cardRef.current) {
      const tempStep = Math.floor(width / cardRef.current.offsetWidth);
      setStep(tempStep === 0 ? 1 : tempStep);
    }
  });

  return { step, ref };
}
