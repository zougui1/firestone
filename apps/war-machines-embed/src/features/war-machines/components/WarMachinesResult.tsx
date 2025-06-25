import { Typography } from '~/components/ui';

import { CampaignSimulation } from './CampaignSimulation';
import { WarMachinesFormation } from './WarMachinesFormation';

export const WarMachinesResult = () => {
  return (
    <div>
      <Typography.H4>Likely Best Results</Typography.H4>

      <div className="flex flex-wrap space-x-4">
        <WarMachinesFormation />
        <CampaignSimulation />
      </div>
    </div>
  );
}
