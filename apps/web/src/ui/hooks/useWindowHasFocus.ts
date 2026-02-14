import { useEffect, useState } from "react";
import { useWindowEvent } from "./useWindowEvent";

export const useWindowHasFocus = () => {
  const [hasFocus, setHasFocus] = useState(true);

  useWindowEvent("blur", () => setHasFocus(false));
  useWindowEvent("focus", () => setHasFocus(true));

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!document.hasFocus()) {
      setHasFocus(false);
    }
  }, []);

  return hasFocus;
};
