import { type DetailedCampaignResult } from './simulateDetailedMission';

export const getTotalStars = (campaign: Partial<DetailedCampaignResult>) => {
  let stars = 0;

  for (const missions of Object.values(campaign)) {
    for (const mission of missions) {
      if (mission.status === 'win' || mission.status === 'can-win') {
        stars++;
      }
    }
  }

  return stars;
}
