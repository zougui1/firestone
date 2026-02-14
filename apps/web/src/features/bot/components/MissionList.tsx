import { sort } from "radash";
import { useQuery } from "@tanstack/react-query";
import { CheckIcon } from "lucide-react";

import { useTRPC } from "~/utils/trpc";
import { Skeleton } from "~/ui";

const difficultyOrder = {
  easy: 0,
  normal: 1,
  hard: 2,
  insane: 3,
  nightmare: 4,
};

const skeletons = (
  <div className="flex flex-col gap-2">
    <Skeleton className="w-[125px] h-4.5" />
    <Skeleton className="w-[101px] h-4.5" />
    <Skeleton className="w-[128px] h-4.5" />
    <Skeleton className="w-[132px] h-4.5" />
  </div>
);

export const MissionList = () => {
  const trpc = useTRPC();
  const { data: lastMissions, isFetching } = useQuery(
    trpc.bot.findLastMissions.queryOptions(undefined, {
      refetchInterval: 5000,
    }),
  );

  return (
    <div>
      {isFetching && !lastMissions && skeletons}

      <div>
        {sort(lastMissions ?? [], (m) => difficultyOrder[m.difficulty]).map(
          (mission) => (
            <div key={mission.difficulty} className="flex gap-1.5">
              <span className="capitalize">
                {mission.difficulty} {mission.level}: {mission.attempts}
              </span>

              {mission.wonAt && <CheckIcon className="text-success" />}
            </div>
          ),
        )}
      </div>
    </div>
  );
};
