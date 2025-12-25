'use client';

import { useSelector } from "@xstate/store/react";

import { Dialog, Input, Label, Select } from "~/components/ui";
import { handleNumberInputChange } from "~/utils";

import { gameDataStore, type WarMachine } from "../gameData"
import { warMachineRarityData, type WarMachineRarity } from "@zougui/firestone.war-machines";

const handleLevelChange = (name: string, field: keyof WarMachine) => {
  return handleNumberInputChange(value => {
    gameDataStore.trigger.updateWarMachine({
      name,
      data: { [field]: value },
    });
  });
}

interface NumberInputProps {
  warMachineName: string;
  label: string;
  field: keyof WarMachine;
}

const NumberInput = ({ field, label, warMachineName }: NumberInputProps) => {
  const value = useSelector(gameDataStore, state => state.context.warMachines[warMachineName]?.[field]);

  return (
    <Label className="grid">
      {label}

      <Input
        value={value ?? ''}
        onChange={handleLevelChange(warMachineName, field)}
      />
    </Label>
  );
}

export interface WarMachineFormDialogProps {
  warMachine: WarMachine;
  children?: React.ReactNode;
}

export const WarMachineFormDialog = ({ warMachine, children }: WarMachineFormDialogProps) => {
  const handleChange = (value: string) => {
    gameDataStore.trigger.updateWarMachineRarity({
      name: warMachine.name,
      rarity: value as WarMachineRarity,
    });
  }

  return (
    <Dialog.Root>
      {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title className="capitalize">{warMachine.name}</Dialog.Title>
          <img
            className="size-24"
            src={`/war-machines/${warMachine.name}.webp`}
            alt={warMachine.name}
          />
        </Dialog.Header>

        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Level" field="level" warMachineName={warMachine.name} />
          <NumberInput label="Sacred Card Level" field="sacredCardLevel" warMachineName={warMachine.name} />
          <NumberInput label="Lost Inscription Level" field="lostInscriptionLevel" warMachineName={warMachine.name} />
          <NumberInput label="Damage Blueprint Level" field="damageBlueprintLevel" warMachineName={warMachine.name} />
          <NumberInput label="Health Blueprint Level" field="healthBlueprintLevel" warMachineName={warMachine.name} />
          <NumberInput label="Armor Blueprint Level" field="armorBlueprintLevel" warMachineName={warMachine.name} />

          <Select.Root
            value={warMachine?.rarity ?? 'common'}
            onValueChange={handleChange}
          >
            <Select.Trigger className="w-[16ch]">
              <Select.Value />
            </Select.Trigger>

            <Select.Content className="w-[13ch]">
              {Object.keys(warMachineRarityData).map(rarity => (
                <Select.Item key={rarity} value={rarity} className="capitalize">
                  {rarity}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
