"use client";

import { heroesStore } from "../heroes.store";
import { useBestCampaignFormation } from "../hooks";

const numberFormatter = Intl.NumberFormat("en-US");

export const WarMachinesFormation = () => {
  const { data } = useBestCampaignFormation();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {data &&
          Object.values(data.warMachines).map((warMachine) => (
            <div key={warMachine.name} className="flex flex-col gap-2">
              <img
                className="size-16 mb-2"
                src={`/war-machines/${warMachine.name}.webp`}
                alt={warMachine.name}
              />

              {warMachine.crew.map((heroName) => (
                <img
                  key={heroName}
                  className="size-16 cursor-pointer"
                  src={`/heroes/${heroName}.webp`}
                  alt={heroName}
                  onClick={() => {
                    const element =
                      heroesStore.getSnapshot().context.heroCards[heroName];
                    element?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "nearest",
                    });
                    element?.querySelector("input")?.focus();
                  }}
                />
              ))}
            </div>
          ))}
      </div>

      <div>
        Campaign Power: {numberFormatter.format(data?.campaignPower ?? 0)}
      </div>
    </div>
  );
};
