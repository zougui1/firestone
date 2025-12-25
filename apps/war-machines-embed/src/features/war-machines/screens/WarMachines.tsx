import { Separator, Button } from '~/components/ui';

import { HeroesTable } from '../components/HeroesTable';
import { ArtifactTypesTable } from '../components/ArtifactTypesTable';
import { WarMachinesResult } from '../components/WarMachinesResult';
import { ImportDialog } from '../components/ImportDialog';
import { ExportDialog } from '../components/ExportDialog';
import { TargetCampaign } from '../components/TargetCampaign';
import { Tabs } from "~/components/ui/Tabs";
import { WarMachinesList } from "../components/WarMachinesList";

const tabs = {
  warMachines: 'warMachines',
  heroes: 'heroes',
  artifacts: 'artifacts',
}

export const WarMachines = () => {
  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex justify-end space-x-2">
        <ImportDialog>
          <Button>Import</Button>
        </ImportDialog>

        <ExportDialog>
          <Button>Export</Button>
        </ExportDialog>
      </div>

      <Tabs.Root defaultValue={tabs.warMachines}>
        <Tabs.List>
          <Tabs.Trigger value={tabs.warMachines}>War Machines</Tabs.Trigger>
          <Tabs.Trigger value={tabs.heroes}>Heroes</Tabs.Trigger>
          <Tabs.Trigger value={tabs.artifacts}>Artifacts</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={tabs.warMachines}>
          <WarMachinesList />
        </Tabs.Content>

        <Tabs.Content value={tabs.heroes}>
          <HeroesTable />
        </Tabs.Content>

        <Tabs.Content value={tabs.artifacts}>
          <ArtifactTypesTable />
        </Tabs.Content>
      </Tabs.Root>

      <div>
        <WarMachinesResult />
      </div>

      <div>
        <Separator className="my-8" />
      </div>

      <div>
        <TargetCampaign />
      </div>
    </div>
  );
}
