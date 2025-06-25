import { useSelector } from '@xstate/store/react';
import { useQuery } from '@tanstack/react-query';

import { gameDataStore } from '../gameData';
import { targetCampaignStore } from '../targetCampaignStore';
import { findTargetStarFormation } from '../utils';

export const useTargetCampaignFormation = () => {
  const data = useSelector(gameDataStore, state => state.context);
  const targetStarLevel = useSelector(targetCampaignStore, state => state.context.starLevel);
  const minimumSuccessChance = useSelector(targetCampaignStore, state => state.context.minimumSuccessChance);

  return useQuery({
    queryKey: ['findTargetStarFormation', data, targetStarLevel, minimumSuccessChance],
    queryFn: async ({ signal }) => {
      try {
        const result = await findTargetStarFormation(
          data,
          { starLevel: targetStarLevel, minimumSuccessChance },
          { signal },
        );

        targetCampaignStore.trigger.changeTargetFormation({
          warMachines: result.warMachines,
        });

        return result;
      } catch (error) {
        console.error('target campaign error:', error)
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
}
