"use client";

import { warMachineRarityData } from "@zougui/firestone.war-machines";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { BadgeInput } from "~/components/BadgeInput";
import { Button } from "~/ui";

const rarityVariants = tv({
  base: "text-white",

  variants: {
    rarity: {
      locked: "bg-rarity-locked opacity-40",
      common: "bg-rarity-common",
      uncommon: "bg-rarity-uncommon",
      rare: "bg-rarity-rare",
      epic: "bg-rarity-epic",
      legendary: "bg-rarity-legendary",
      mythic: "bg-rarity-mythic",
      titan: "bg-rarity-titan",
      angel: "bg-rarity-angel",
    },
  },
});

type ValueType = "level" | "rarityLevel";

const valueProps = {
  level: {
    button: "L",
    nextValueType: "rarityLevel",
  },

  rarityLevel: {
    button: "R",
    nextValueType: "level",
  },
} as const;

export interface JewelInputProps {
  icon: { src: string; alt: string };
  level: number;
  onLevelChange: (level: number) => void;
  rarityLevel: number;
  onRarityLevelChange: (rarityLevel: number) => void;
}

export const JewelInput = ({
  icon,
  level,
  onLevelChange,
  rarityLevel,
  onRarityLevelChange,
}: JewelInputProps) => {
  const [valueType, setValueType] = useState<ValueType>("level");
  const { button, nextValueType } = valueProps[valueType];

  const value = {
    level,
    rarityLevel,
  }[valueType];

  const onValueChange = {
    level: onLevelChange,
    rarityLevel: onRarityLevelChange,
  }[valueType];

  return (
    <BadgeInput
      value={value}
      onValueChange={(value) => onValueChange(value ?? 0)}
      label={
        <img
          {...icon}
          className={rarityVariants({
            className: "h-5.5 min-w-5.5 object-contain rounded-full p-0.5",
            rarity: warMachineRarityData.fromLevel[rarityLevel ?? 0],
          })}
        />
      }
      addon={
        <Button
          className="cursor-pointer ml-1 p-0 h-auto"
          appearance="ghost"
          onClick={() => setValueType(nextValueType)}
        >
          {button}
        </Button>
      }
      slotProps={{
        input: { className: "w-[3ch]" },
      }}
    />
  );
};
