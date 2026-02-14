import { Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { BotConfig } from "~/features/bot/components";
import { Separator, Skeleton } from "~/ui";

export const Route = createFileRoute("/")({
  component: BotPage,
});

const Loading = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Skeleton className="h-[170px] max-w-md w-full" />

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full md:w-10/12 gap-4">
        <Skeleton className="h-[188px]" />
        <Skeleton className="h-[188px]" />
        <Skeleton className="h-[152px]" />
        <Skeleton className="h-[152px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
        <Skeleton className="h-[68px]" />
      </div>
    </div>
  );
};

function BotPage() {
  return (
    <div className="container mx-auto px-4 py-2">
      <Suspense fallback={<Loading />}>
        <BotConfig />
      </Suspense>
    </div>
  );
}
