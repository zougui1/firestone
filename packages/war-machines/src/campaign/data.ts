import type { CampaignDifficulty } from '@zougui/firestone.types';

export const defaultTotalSimulations = 10_000;
export const maxCampaignMissions = 90;
export const difficulties: CampaignDifficulty[] = ['easy', 'normal', 'hard', 'insane', 'nightmare'];

export const difficultyMultipliers: Record<CampaignDifficulty, number> = {
  easy: 1,
  normal: 360,
  hard: 2478600,
  insane: 5800000000000,
  nightmare: 2920000000000000000,
};
