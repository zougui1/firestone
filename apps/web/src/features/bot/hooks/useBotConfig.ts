'use client';

import { useState, useRef } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { type db } from '@zougui/firestone.db';

import { useTRPC } from '~/trpc/react';

type Config = Omit<typeof db.config.schema, '_id'> & { _id: string; };

export const useBotConfig = () => {
  const trpc = useTRPC();
  const [optimisticConfig, setOptimisticConfig] = useState<Config | undefined>();
  const optimisticDataUpdatedAt = useRef(0);

  const { data: serverConfig, dataUpdatedAt } = useSuspenseQuery(trpc.bot.findConfig.queryOptions());
  const config = optimisticDataUpdatedAt.current > dataUpdatedAt ? (optimisticConfig ?? serverConfig) : serverConfig;

  const setOptimisticData: React.Dispatch<React.SetStateAction<Config | undefined>> = (dispatch) => {
    if (typeof dispatch !== 'function') {
      optimisticDataUpdatedAt.current = Date.now();
      setOptimisticConfig(dispatch);
      return;
    }

    setOptimisticConfig(prevConfig => {
      optimisticDataUpdatedAt.current = Date.now();
      return dispatch(prevConfig);
    });
  }

  return {
    data: config,
    serverData: serverConfig,
    optimisticData: optimisticConfig,
    setOptimisticData,
  };
}
