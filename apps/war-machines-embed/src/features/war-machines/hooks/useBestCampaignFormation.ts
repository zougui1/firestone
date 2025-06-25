'use client';

import { useQuery } from '@tanstack/react-query';
import { useSelector } from '@xstate/store/react';

import { invokeComputeBestFormation } from '../invokers';
import { gameDataStore } from '../gameData';

export const useBestCampaignFormation = () => {
  const data = useSelector(gameDataStore, state => state.context);

  return useQuery({
    queryKey: ['computeBestFormation', data],
    queryFn: ({ signal }) => {
      return invokeComputeBestFormation(data, { signal });
    },
    refetchOnWindowFocus: false,
  });
}
