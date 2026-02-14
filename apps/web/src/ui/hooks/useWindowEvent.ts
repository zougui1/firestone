import { useEffect, useEffectEvent } from "react";

export const useWindowEvent = <E extends keyof WindowEventMap>(
  type: E,
  listener: (event: WindowEventMap[E]) => void,
) => {
  const eventListener = useEffectEvent(listener);

  useEffect(() => {
    window.addEventListener(type, eventListener);

    return () => {
      window.removeEventListener(type, eventListener);
    };
  }, [type]);
};
