import React from "react";

type DomElement = HTMLElement | null;

const useCloseOnClickOutside = <E extends DomElement, T extends DomElement>(
  elementToCloseRef: React.MutableRefObject<E>,
  isOpen: boolean,
  handler: (e?: Event) => unknown,
  triggerElementRef?: React.MutableRefObject<T>,
) => {
  React.useEffect(() => {
    const listener = (e: Event) => {
      const isClickedInsideElementToClose =
        elementToCloseRef.current && elementToCloseRef.current.contains(e.target as Node);
      const isClickedInsideTrigger =
        triggerElementRef &&
        triggerElementRef.current &&
        triggerElementRef.current.contains(e.target as Node);
      if (isClickedInsideElementToClose || isClickedInsideTrigger) {
        return;
      }
      handler(e);
    };
    if (isOpen) {
      window.addEventListener("mousedown", listener);
      window.addEventListener("touchstart", listener);
    }
    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
    };
  }, [isOpen]);
};

export default useCloseOnClickOutside;
