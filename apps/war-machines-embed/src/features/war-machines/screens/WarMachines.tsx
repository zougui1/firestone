import { Accordion, Typography, Separator, Button } from '~/components/ui';

import { WarMachinesTable } from '../components/WarMachinesTable';
import { HeroesTable } from '../components/HeroesTable';
import { ArtifactTypesTable } from '../components/ArtifactTypesTable';
import { WarMachinesResult } from '../components/WarMachinesResult';
import { ImportDialog } from '../components/ImportDialog';
import { ExportDialog } from '../components/ExportDialog';
import { TargetCampaign } from '../components/TargetCampaign';

export const WarMachines = () => {
  return (
    <div className="container mx-auto py-8 space-y-2">
      <div className="flex justify-end space-x-2">
        <ImportDialog>
          <Button>Import</Button>
        </ImportDialog>

        <ExportDialog>
          <Button>Export</Button>
        </ExportDialog>
      </div>

      <div className="space-y-8">
        <Accordion.Root type="multiple">
          <Accordion.Item value="warMachines">
            <Accordion.Trigger>
              <Typography.H4>War Machines</Typography.H4>
            </Accordion.Trigger>

            <Accordion.Content>
              <WarMachinesTable className="max-w-3xl" />
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="heroes">
            <Accordion.Trigger>
              <Typography.H4>Heroes</Typography.H4>
            </Accordion.Trigger>

            <Accordion.Content>
              <HeroesTable className="max-w-md" />
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="artifactTypes">
            <Accordion.Trigger>
              <Typography.H4>Artifact Types</Typography.H4>
            </Accordion.Trigger>

            <Accordion.Content>
              <ArtifactTypesTable className="max-w-5xl" />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>

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
