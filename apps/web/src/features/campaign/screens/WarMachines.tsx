import { Suspense } from "react";

import { Separator, Tabs } from "~/ui";

import { ArtifactTypesTable } from "../components/ArtifactTypesTable";
import { TargetCampaign } from "../components/TargetCampaign";
import { WarMachinesResult } from "../components/WarMachinesResult";
import { HeroesList } from "../components/HeroesList";
import { WarMachinesList } from "../../war-machines/components";

const tabs = {
  warMachines: "warMachines",
  heroes: "heroes",
  artifacts: "artifacts",
};

export const WarMachines = () => {
  return (
    <div className="container mx-auto space-y-4 px-2 pt-8 pb-4 md:px-0">
      <Tabs.Root defaultValue={tabs.warMachines}>
        <Tabs.List>
          <Tabs.Trigger value={tabs.warMachines}>War Machines</Tabs.Trigger>
          <Tabs.Trigger value={tabs.heroes}>Heroes</Tabs.Trigger>
          <Tabs.Trigger value={tabs.artifacts}>Artifacts</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value={tabs.warMachines}>
          <Suspense fallback="Loading...">
            <WarMachinesList />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value={tabs.heroes}>
          <Suspense fallback="Loading...">
            <HeroesList />
          </Suspense>
        </Tabs.Content>

        <Tabs.Content value={tabs.artifacts}>
          <Suspense fallback="Loading...">
            <ArtifactTypesTable />
          </Suspense>
        </Tabs.Content>
      </Tabs.Root>

      <div>
        <Suspense fallback="Loading...">
          <WarMachinesResult />
        </Suspense>
      </div>

      <div>
        <Separator className="my-8" />
      </div>

      <div>
        <Suspense fallback="Loading...">
          <TargetCampaign />
        </Suspense>
      </div>
    </div>
  );
};
