import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { WarMachines } from "~/features/campaign/screens/WarMachines";

export const Route = createFileRoute("/campaign")({
  component: CampaignPage,
});

function CampaignPage() {
  return (
    <div className="container mx-auto px-4 py-2">
      <Suspense fallback="Loading...">
        <WarMachines />
      </Suspense>
    </div>
  );
}
