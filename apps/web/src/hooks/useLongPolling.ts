'use client';

import { useEffect, useRef } from 'react';

export const useLongPolling = (refetch: () => unknown, isFetching: boolean, delayMs = 5000) => {
  const fetch = () => {
    if (!isFetching) {
      refetch();
    }
  }

  const fetchRef = useRef(fetch);
  fetchRef.current = fetch;

  useEffect(() => {
    const intervalId = setInterval(() => fetchRef.current(), delayMs);

    return () => {
      clearInterval(intervalId);
    }
  }, [delayMs]);
}
