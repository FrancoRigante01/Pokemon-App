import { useEffect } from "react";
import React from "react";

/**
 * Calls "onIntersect" when the observed element is fully visible.
 * @param ref React ref to the target element (HTMLElement or null).
 * @param onIntersect Callback to execute when intersecting.
 * @param enabled Whether to enable the observer.
 */
export const useInfiniteScroll = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onIntersect: () => void,
  enabled: boolean
) => {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const observer = new IntersectionObserver(
      entries => entries[0].isIntersecting && onIntersect(),
      { threshold: 1.0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, onIntersect, enabled]);
};
