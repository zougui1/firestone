import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, createElement, useMemo, useRef, useEffect, Suspense } from "react";
import "clsx";
import { c as cn, D as DataTableProvider, u as useDataTableContext, T as TableRow, a as TableHeader, I as Input, w as warMachineRarityData, b as artifactTypeBaseData, d as useTRPC, N as NumberFieldInput, S as Spinner, e as Switch, P as ProgressTrack, f as ProgressIndicator, g as ScrollAreaViewport, h as ScrollAreaContent, i as ScrollAreaScrollbar, j as InputGroupRoot, k as InputGroupAddon, B as Button, l as Skeleton, m as jewelBaseData, n as TabsList, o as Separator } from "./router-Bx6zLbHC.js";
import { Tabs } from "@base-ui/react/tabs";
import { useReactTable, getSortedRowModel, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { mergeProps, Progress, ScrollArea } from "@base-ui/react";
import { ArrowUp, ArrowDown, ArrowUpDown, ArrowBigUpIcon, CheckIcon } from "lucide-react";
import { N as NumberFieldRoot } from "./NumberFieldRoot-CdUt05b2.js";
import { z } from "zod";
import "neverthrow";
import "munkres-js";
import { createStore } from "@xstate/store";
import { produce } from "immer";
import { useQueryClient, useSuspenseQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "@xstate/store/react";
import { max, sort, min, isNumber, isEqual, sum } from "radash";
import { cva } from "class-variance-authority";
import { tv } from "tailwind-variants";
import "superjson";
import "@tanstack/react-router";
import "@trpc/client";
import "@trpc/tanstack-react-query";
import "tailwind-merge";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "@trpc/server/adapters/fetch";
import "flat";
import "execa";
import "dotenv/config";
import "@t3-oss/env-core";
import "mongodb";
import "papr";
import "@trpc/server";
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-3 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  );
}
function TableViewport({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-viewport",
      className: cn("relative w-full overflow-x-auto shadow-md", className),
      ...props
    }
  );
}
function TableContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "table",
    {
      "data-slot": "table-content",
      className: cn("w-full caption-bottom text-sm", className),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        `text-foreground h-10 px-2 text-left align-middle font-medium
        whitespace-nowrap [&:has([role=checkbox])]:pr-0`,
        className
      ),
      ...props
    }
  );
}
function TableRoot({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "table-root",
      className: cn(
        "bg-background w-full rounded-lg border shadow-md",
        "grid grid-rows-[1fr_auto]",
        className
      ),
      ...props
    }
  );
}
function DataTableRoot({ data, columns: columns2, getRowId, ...props }) {
  const [sorting, setSorting] = useState([]);
  const [selection, setSelection] = useState({
    [data[2]?.invoice]: true
  });
  const table = useReactTable({
    data,
    columns: columns2,
    getRowId,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: false,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: true,
    enableRowSelection: true,
    onRowSelectionChange: setSelection,
    state: {
      sorting,
      rowSelection: selection
    }
  });
  return /* @__PURE__ */ jsx(
    DataTableProvider,
    {
      value: {
        data,
        columns: columns2,
        table
      },
      children: /* @__PURE__ */ jsx(TableRoot, { ...props })
    }
  );
}
const DataTableTable = (props) => {
  return /* @__PURE__ */ jsx(TableContent, { ...props });
};
const DataTableTableBody = ({
  children,
  slotProps,
  hoverEffect,
  borderless,
  ...props
}) => {
  const { table } = useDataTableContext();
  const renderCell = (cell) => {
    const columnDef = cell.column.columnDef;
    return flexRender(columnDef.cell, cell.getContext());
  };
  const { rows } = table.getRowModel();
  if (!children && !rows.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(TableBody, { ...props, children: children ?? rows.map((row) => /* @__PURE__ */ jsx(
    TableRow,
    {
      "data-state": row.getIsSelected() ? "selected" : void 0,
      hoverEffect,
      borderless,
      ...slotProps?.row,
      children: row.getVisibleCells().map((cell) => {
        const columnDef = cell.column.columnDef;
        const meta = columnDef.meta ?? {};
        const cellProps = mergeProps(meta.common ?? {}, meta.cell ?? {});
        return /* @__PURE__ */ createElement(
          TableCell,
          {
            ...cellProps,
            style: {
              maxWidth: meta.width,
              width: meta.width,
              ...cellProps.style
            },
            className: cn(
              "wrap-break-word whitespace-normal",
              meta.common?.className,
              meta.cell?.className
            ),
            key: cell.id
          },
          renderCell(cell)
        );
      })
    },
    row.id
  )) });
};
const DataTableTableEmpty = ({
  children,
  slotProps,
  borderless,
  ...props
}) => {
  const { table } = useDataTableContext();
  const { rows } = table.getRowModel();
  if (rows.length) {
    return null;
  }
  return /* @__PURE__ */ jsx(TableBody, { ...props, children: children ?? /* @__PURE__ */ jsx(TableRow, { borderless, ...slotProps?.row, children: /* @__PURE__ */ jsx(
    TableCell,
    {
      colSpan: table.getAllColumns().length,
      className: "py-6 text-base font-medium",
      children: "No data"
    }
  ) }) });
};
const DataTableTableHeader = ({
  children,
  borderless,
  ...props
}) => {
  const { table } = useDataTableContext();
  const renderHeader = (header) => {
    if (header.isPlaceholder) return;
    const { column } = header;
    const columnDef = column.columnDef;
    const content = flexRender(columnDef.header, header.getContext());
    const isSorted = column.getIsSorted();
    const renderSortIcon = () => {
      if (isSorted === "asc") {
        return /* @__PURE__ */ jsx(ArrowUp, { "data-slot": "sort-icon", className: "size-5" });
      }
      if (isSorted === "desc") {
        return /* @__PURE__ */ jsx(ArrowDown, { "data-slot": "sort-icon", className: "size-5" });
      }
      if (columnDef.enableSorting) {
        return /* @__PURE__ */ jsx(
          ArrowUpDown,
          {
            "data-slot": "sortable-icon",
            className: "hidden size-5 group-hover:inline-block"
          }
        );
      }
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        className: "group inline-flex items-center gap-2",
        onClick: () => column.toggleSorting(),
        children: [
          content,
          renderSortIcon()
        ]
      }
    );
  };
  return /* @__PURE__ */ jsx(TableHeader, { ...props, borderless, children: children ?? /* @__PURE__ */ jsx(Fragment, { children: table.getHeaderGroups().map((group) => /* @__PURE__ */ jsx(TableRow, { borderless, children: group.headers.map((header) => {
    const columnDef = header.column.columnDef;
    const meta = columnDef.meta ?? {};
    const headerProps = mergeProps(
      meta.common ?? {},
      meta.header ?? {}
    );
    return /* @__PURE__ */ jsx(
      TableHead,
      {
        ...headerProps,
        style: {
          width: meta.width,
          ...headerProps.style
        },
        children: renderHeader(header)
      },
      header.id
    );
  }) }, group.id)) }) });
};
const DataTableViewport = ({
  style,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    TableViewport,
    {
      className: cn("inset-shadow-sm", className),
      style: {
        "--tw-inset-shadow": "inset 0 0 2px var(--tw-inset-shadow-color, rgb(0 0 0 / 1.05))",
        ...style
      },
      ...props
    }
  );
};
function InputGroupInput({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Input,
    {
      "data-slot": "input-group-control",
      className: cn(
        `flex-1 rounded-none border-0 bg-transparent shadow-none ring-0
        focus-visible:outline-0 disabled:bg-transparent aria-invalid:ring-0`,
        className
      ),
      ...props
    }
  );
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "label",
    {
      "data-slot": "label",
      className: cn(
        `flex items-center gap-2 text-sm leading-none font-medium select-none
        group-data-[disabled=true]:pointer-events-none
        group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed
        peer-disabled:opacity-50`,
        className
      ),
      ...props
    }
  );
}
const ProgressRoot = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    Progress.Root,
    {
      "data-slot": "progress-root",
      className: cn("grid grid-cols-[1fr_1fr] gap-1 gap-y-2", className),
      ...props
    }
  );
};
const ScrollAreaCorner = (props) => {
  return /* @__PURE__ */ jsx(ScrollArea.Corner, { "data-slot": "scroll-area-corner", ...props });
};
const ScrollAreaRoot = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    ScrollArea.Root,
    {
      "data-slot": "scroll-area-root",
      ...props,
      className: cn(
        `has-focus-visible:outline-primary relative flex min-h-0 flex-1
        overflow-hidden rounded-md has-focus-visible:outline-[3px]
        has-focus-visible:outline-offset-2`,
        className
      )
    }
  );
};
const ScrollAreaThumb = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    ScrollArea.Thumb,
    {
      "data-slot": "scroll-area-thumb",
      ...props,
      className: cn("w-full rounded-[inherit] bg-gray-500", className)
    }
  );
};
function TabsContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Tabs.Panel,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 text-sm outline-none", className),
      ...props
    }
  );
}
function TabsRoot({
  className,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tabs.Root,
    {
      "data-slot": "tabs-root",
      "data-orientation": orientation,
      className: cn(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Tabs.Tab,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        `hover:text-foreground data-active:text-foreground m-0 inline-flex h-8
        appearance-none items-center justify-center border-0 px-2 text-sm
        font-medium break-keep whitespace-nowrap text-gray-400 outline-0
        transition-colors select-none`,
        `focus-visible:before:outline-default/80! focus-visible:relative
        focus-visible:before:absolute focus-visible:before:inset-[0.25rem_0]
        focus-visible:before:rounded-sm focus-visible:before:outline-2
        focus-visible:before:outline-offset-2 focus-visible:before:content-['']`,
        className
      ),
      ...props
    }
  );
}
const TypographyH4 = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "h4",
    {
      className: cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      ),
      ...props
    }
  );
};
const TypographyParagraph = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx("p", { className: cn("leading-6", className), ...props });
};
const randomInt = (min2, max2) => {
  return Math.floor(Math.random() * (max2 - min2 + 1)) + min2;
};
const getDamageDealt = (damage, armor) => {
  return Math.max(damage - armor, 0);
};
const healWarMachine = (warMachine, heal) => {
  warMachine.health += heal;
  warMachine.health = Math.min(warMachine.maxHealth, warMachine.health);
};
const getRandomTargets = (warMachines, targetCount) => {
  const aliveWarMachines = warMachines.filter((wm) => wm.health > 0);
  const selectedTargets = [];
  if (targetCount >= aliveWarMachines.length) {
    return aliveWarMachines;
  }
  for (let i = 0; i < targetCount; i++) {
    const randIndex = i + Math.floor(Math.random() * (aliveWarMachines.length - i));
    [aliveWarMachines[i], aliveWarMachines[randIndex]] = [aliveWarMachines[randIndex], aliveWarMachines[i]];
    selectedTargets.push(aliveWarMachines[i]);
  }
  return selectedTargets;
};
const applyAbility = (attacker, target, options) => {
  const { playerWarMachines, enemyWarMachines, abilityActivationChance = -1 } = options;
  const activationThreshold = randomInt(1, 100);
  const activationChance = abilityActivationChance < 0 ? attacker.abilityActivationChance : abilityActivationChance;
  if (activationThreshold > activationChance) {
    return 0;
  }
  const handlers = {
    cloudfist: () => getDamageDealt(attacker.damage * 2, target.armor),
    talos: () => getDamageDealt(attacker.damage * 2, target.armor),
    aegis: () => getDamageDealt(attacker.damage * 1.6, target.armor),
    firecracker: () => getDamageDealt(attacker.damage * 1.5, target.armor),
    goliath: () => {
      healWarMachine(attacker, attacker.maxHealth * 0.1);
    },
    earthshatterer: () => {
      for (const enemy of enemyWarMachines) {
        enemy.health -= getDamageDealt(attacker.damage * 0.8, enemy.armor);
      }
    },
    judgement: () => {
      for (const enemy of enemyWarMachines) {
        enemy.health -= getDamageDealt(attacker.damage * 0.6, enemy.armor);
      }
    },
    fortress: () => {
      const targets = getRandomTargets(enemyWarMachines, 2);
      for (const target2 of targets) {
        target2.health -= getDamageDealt(attacker.damage * 0.6, target2.armor);
      }
    },
    sentinel: () => {
      for (const warMachine of playerWarMachines) {
        if (warMachine.health > 0) {
          healWarMachine(warMachine, attacker.damage * 0.6);
        }
      }
    },
    hunter: () => {
      const targets = getRandomTargets(playerWarMachines, 2);
      for (const target2 of targets) {
        if (target2.health > 0) {
          healWarMachine(target2, attacker.damage * 1.5);
        }
      }
    },
    thunderclap: () => {
      const targets = getRandomTargets(enemyWarMachines, 3);
      for (const target2 of targets) {
        target2.health -= getDamageDealt(attacker.damage * 1.2, target2.armor);
      }
    },
    harvester: () => {
      const aliveEnemies = enemyWarMachines.filter((wm) => wm.health > 0);
      for (const enemy of aliveEnemies.reverse().slice(0, 2)) {
        enemy.health -= getDamageDealt(attacker.damage * 1.3, enemy.armor);
      }
    },
    curator: () => {
      let lowestHealth;
      let lowestHealthWarMachine;
      for (const warMachine of playerWarMachines) {
        if (warMachine.health > 0) {
          if (lowestHealth === void 0 || lowestHealth > (warMachine.maxHealth - warMachine.health) / warMachine.maxHealth) {
            lowestHealthWarMachine = warMachine;
            lowestHealth = (warMachine.maxHealth - warMachine.health) / warMachine.maxHealth;
          }
        }
      }
      if (lowestHealthWarMachine) {
        healWarMachine(lowestHealthWarMachine, attacker.damage * 3);
      }
    }
  };
  const abilities = handlers;
  if (!(attacker.name in abilities)) {
    return 0;
  }
  return abilities[attacker.name]?.() ?? 0;
};
const attackWarMachine = (attacker, target, options) => {
  const damage = getDamageDealt(attacker.damage, target.armor);
  const extraDamage = applyAbility(attacker, target, options);
  return { damage, extraDamage };
};
const heroBaseData = {
  talia: {
    name: "talia",
    specialization: "damage"
  },
  burt: {
    name: "burt",
    specialization: "damage"
  },
  solaine: {
    name: "solaine",
    specialization: "damage"
  },
  boris: {
    name: "boris",
    specialization: "tank"
  },
  benedictus: {
    name: "benedictus",
    specialization: "healer"
  },
  leo: {
    name: "leo",
    specialization: "tank"
  },
  muriel: {
    name: "muriel",
    specialization: "damage"
  },
  blaze: {
    name: "blaze",
    specialization: "damage"
  },
  luana: {
    name: "luana",
    specialization: "healer"
  },
  valerius: {
    name: "valerius",
    specialization: "tank"
  },
  astrid: {
    name: "astrid",
    specialization: "damage"
  },
  ina: {
    name: "ina",
    specialization: "damage"
  },
  fini: {
    name: "fini",
    specialization: "damage"
  },
  asmondai: {
    name: "asmondai",
    specialization: "tank"
  },
  danysa: {
    name: "danysa",
    specialization: "tank"
  },
  iseris: {
    name: "iseris",
    specialization: "damage"
  },
  belien: {
    name: "belien",
    specialization: "healer"
  },
  sely: {
    name: "sely",
    specialization: "damage"
  },
  randal: {
    name: "randal",
    specialization: "tank"
  },
  molly: {
    name: "molly",
    specialization: "damage"
  },
  layla: {
    name: "layla",
    specialization: "healer"
  },
  joe: {
    name: "joe",
    specialization: "damage"
  },
  hongyu: {
    name: "hongyu",
    specialization: "damage"
  },
  amun: {
    name: "amun",
    specialization: "damage"
  },
  panko: {
    name: "panko",
    specialization: "tank"
  },
  yavo: {
    name: "yavo",
    specialization: "healer"
  },
  cirilo: {
    name: "cirilo",
    specialization: "damage"
  },
  vilon: {
    name: "vilon",
    specialization: "damage"
  },
  anzo: {
    name: "anzo",
    specialization: "tank"
  },
  zelea: {
    name: "zelea",
    specialization: "damage"
  },
  zoruk: {
    name: "zoruk",
    specialization: "healer"
  },
  rickie: {
    name: "rickie",
    specialization: "damage"
  },
  jess: {
    name: "jess",
    specialization: "damage"
  },
  ledra: {
    name: "ledra",
    specialization: "healer"
  },
  yamanoth: {
    name: "yamanoth",
    specialization: "tank"
  },
  kramatak: {
    name: "kramatak",
    specialization: "damage"
  }
};
const warMachineBaseData = /* @__PURE__ */ new Map([
  ["cloudfist", {
    name: "cloudfist",
    specialization: "damage",
    damage: 880,
    health: 6500,
    armor: 125
  }],
  ["fortress", {
    name: "fortress",
    specialization: "tank",
    health: 11e3,
    damage: 460,
    armor: 300
  }],
  ["aegis", {
    name: "aegis",
    specialization: "damage",
    health: 5100,
    damage: 890,
    armor: 115
  }],
  ["firecracker", {
    name: "firecracker",
    specialization: "damage",
    health: 4900,
    damage: 910,
    armor: 110
  }],
  ["talos", {
    name: "talos",
    specialization: "damage",
    health: 6e3,
    damage: 860,
    armor: 130
  }],
  ["harvester", {
    name: "harvester",
    specialization: "damage",
    health: 5500,
    damage: 960,
    armor: 125
  }],
  ["judgement", {
    name: "judgement",
    specialization: "damage",
    health: 4700,
    damage: 1080,
    armor: 90
  }],
  ["thunderclap", {
    name: "thunderclap",
    specialization: "damage",
    health: 5200,
    damage: 1050,
    armor: 100
  }],
  ["curator", {
    name: "curator",
    specialization: "healer",
    health: 4100,
    damage: 380,
    armor: 150
  }],
  ["hunter", {
    name: "hunter",
    specialization: "healer",
    health: 4900,
    damage: 400,
    armor: 130
  }],
  ["sentinel", {
    name: "sentinel",
    specialization: "healer",
    health: 4400,
    damage: 390,
    armor: 170
  }],
  ["earthshatterer", {
    name: "earthshatterer",
    specialization: "tank",
    health: 10500,
    damage: 510,
    armor: 270
  }],
  ["goliath", {
    name: "goliath",
    specialization: "tank",
    health: 12e3,
    damage: 430,
    armor: 280
  }]
]);
const calculateBlueprintCost = (currentLevel, targetLevel) => {
  if (targetLevel <= currentLevel) {
    return 0;
  }
  let totalBlueprints = 0;
  for (let level = currentLevel; level < targetLevel; level++) {
    totalBlueprints += 100 + level * 5;
  }
  return totalBlueprints;
};
const roundDownToStep = (num, step) => {
  return Math.round(num / step) * step;
};
const costPerUpgrade = {
  screws: 20,
  cogs: 12,
  metal: 1,
  expeditionTokens: 500
};
const calculateResources = (currentLevel, targetLevel) => {
  if (targetLevel <= currentLevel) {
    return {
      screws: 0,
      cogs: 0,
      metal: 0,
      expeditionTokens: 0
    };
  }
  let totalXP = 0;
  let requiredXP = 100;
  for (let level = 1; level < targetLevel; level++) {
    if (level >= currentLevel) {
      totalXP += requiredXP;
    }
    requiredXP += 10;
  }
  const calculateLevelUpCost = (upgradeCost) => {
    return roundDownToStep(totalXP / 100 * upgradeCost, upgradeCost);
  };
  const screws = calculateLevelUpCost(costPerUpgrade.screws);
  const cogs = calculateLevelUpCost(costPerUpgrade.cogs);
  const metal = calculateLevelUpCost(costPerUpgrade.metal);
  const expeditionTokens = calculateLevelUpCost(costPerUpgrade.expeditionTokens);
  return {
    screws,
    cogs,
    metal,
    expeditionTokens
  };
};
const chestComponentsMap = {
  wooden: 11,
  iron: 22,
  golden: 33,
  diamond: 44,
  opal: 55,
  emerald: 132,
  platinum: 264
};
const liberationMissions = {
  5: {
    wooden: 1,
    iron: 1
  },
  10: {
    wooden: 2,
    iron: 1
  },
  20: {
    wooden: 2,
    iron: 2
  },
  40: {
    iron: 2,
    golden: 1
  },
  60: {
    iron: 2,
    golden: 1
  },
  80: {
    iron: 2,
    golden: 1
  },
  110: {
    golden: 1,
    diamond: 1
  },
  155: {
    golden: 1,
    opal: 1
  },
  190: {
    golden: 1,
    emerald: 1
  },
  319: {
    opal: 1,
    platinum: 1
  }
};
const calculateCampaignLevel = (stars) => {
  return Math.floor(stars / 5) + 1;
};
const calculateCampaignEmblemLoots = (stars) => {
  if (stars < 1) {
    return 0;
  }
  const campaignLevel = calculateCampaignLevel(stars);
  const startEmblems = 400;
  const emblemsPerLevel = 8;
  return startEmblems + emblemsPerLevel * (campaignLevel - 1);
};
const getLiberationMissionChests = (stars) => {
  const chests = {};
  for (const [requiredStars, chestRewards] of Object.entries(liberationMissions)) {
    if (Number(requiredStars) > stars) {
      continue;
    }
    for (const [name, number] of Object.entries(chestRewards)) {
      chests[name] ??= 0;
      chests[name] += number;
    }
  }
  return chests;
};
const getWeeklyQuestChests = (stars) => {
  const chests = {};
  const getLiberatorRewards = () => {
    if (stars < 1) {
      return {};
    }
    if (stars <= 99) {
      return { golden: 1 };
    }
    if (stars <= 144) {
      return { diamond: 1 };
    }
    if (stars <= 189) {
      return { opal: 1 };
    }
    if (stars <= 318) {
      return { emerald: 1 };
    }
    return { platinum: 1 };
  };
  const getMinerRewards = () => {
    if (stars < 1) {
      return {};
    }
    if (stars <= 99) {
      return { iron: 2 };
    }
    if (stars <= 144) {
      return { golden: 2 };
    }
    if (stars <= 189) {
      return { diamond: 2 };
    }
    if (stars <= 318) {
      return { opal: 2 };
    }
    return { emerald: 2 };
  };
  const missionRewards = [
    getLiberatorRewards(),
    getMinerRewards()
  ];
  for (const rewards of missionRewards) {
    for (const [name, number] of Object.entries(rewards)) {
      chests[name] ??= 0;
      chests[name] += number;
    }
  }
  return chests;
};
const getMerchantChests = () => {
  return { golden: 5 };
};
const estimateTimeForUpgrade = (data) => {
  const { stars, emblems, requiredResources, ownedResources } = data;
  const today = /* @__PURE__ */ new Date();
  const todayDate = today.getDate();
  const simulatedCurrentDay = today;
  const merchantTradeEmblemCost = 5e3;
  let simulatedOwnedEmblems = emblems;
  let day = 0;
  const totalComponentsRequired = requiredResources.screws + requiredResources.cogs + requiredResources.metal;
  const totalComponentsOwned = ownedResources.screws + ownedResources.cogs + ownedResources.metal;
  const woodenChestsNeeded = Math.ceil((totalComponentsRequired - totalComponentsOwned) / (chestComponentsMap.wooden * 0.8 / 5));
  const totalComponentsNeeded = woodenChestsNeeded * chestComponentsMap.wooden;
  const chests = {};
  const getChestComponents = () => {
    let totalComponents = 0;
    for (const [name, number] of Object.entries(chests)) {
      totalComponents += number * chestComponentsMap[name];
    }
    return totalComponents;
  };
  while (getChestComponents() < totalComponentsNeeded) {
    day++;
    simulatedCurrentDay.setDate(todayDate + day);
    simulatedOwnedEmblems += calculateCampaignEmblemLoots(stars) * 4;
    const rewards = [
      getLiberationMissionChests(stars)
    ];
    if (simulatedCurrentDay.getDay() === 0) {
      rewards.push(getWeeklyQuestChests(stars));
    }
    for (; simulatedOwnedEmblems >= merchantTradeEmblemCost; simulatedOwnedEmblems -= merchantTradeEmblemCost) {
      rewards.push(getMerchantChests());
    }
    for (const reward of rewards) {
      for (const [name, number] of Object.entries(reward)) {
        chests[name] ??= 0;
        chests[name] += number;
      }
    }
  }
  if (day <= 0 && requiredResources.screws > 0 && requiredResources.cogs > 0 && requiredResources.metal > 0 && (ownedResources.screws >= requiredResources.screws || ownedResources.cogs >= requiredResources.cogs || ownedResources.metal >= requiredResources.metal)) {
    return 1;
  }
  return day;
};
const maxCampaignMissions = 90;
const difficulties = [
  "easy",
  "normal",
  "hard",
  "insane",
  "nightmare"
];
const difficultyMultipliers = {
  easy: 1,
  normal: 360,
  hard: 2478600,
  insane: 58e11,
  nightmare: 292e16
};
const simulateCampaignBattle = (options) => {
  const { playerWarMachines, enemyWarMachines } = options;
  let currentEnemyTargetIndex = 0;
  let currentPlayerTargetIndex = 0;
  let rounds = 0;
  const totalPlayWarMachines = playerWarMachines.length;
  for (let round = 1; round <= 20; round++) {
    for (const playerWarMachine of playerWarMachines) {
      if (playerWarMachine.health <= 0) {
        continue;
      }
      const enemyWarMachine = enemyWarMachines[currentEnemyTargetIndex];
      if (!enemyWarMachine) {
        continue;
      }
      const attackResult = attackWarMachine(playerWarMachine, enemyWarMachine, options);
      enemyWarMachine.health -= attackResult.damage + attackResult.extraDamage;
      if (enemyWarMachine.health <= 0) {
        currentEnemyTargetIndex++;
      }
      if (currentEnemyTargetIndex > 4) {
        return { status: "win", rounds };
      }
    }
    for (const enemyWarMachine of enemyWarMachines) {
      if (enemyWarMachine.health <= 0) {
        continue;
      }
      const playerWarMachine = playerWarMachines[currentPlayerTargetIndex];
      if (!playerWarMachine) {
        continue;
      }
      playerWarMachine.health -= getDamageDealt(enemyWarMachine.damage, playerWarMachine.armor);
      if (playerWarMachine.health <= 0) {
        currentPlayerTargetIndex++;
      }
      if (currentPlayerTargetIndex > totalPlayWarMachines - 1) {
        return { status: "lose", rounds };
      }
    }
    rounds = round;
  }
  return { status: "lose", rounds };
};
const getEnemyWarMachine = (multiplier = 1) => {
  return {
    name: "enemy",
    damage: 260 * multiplier,
    maxHealth: 1560 * multiplier,
    health: 1560 * multiplier,
    armor: 30 * multiplier,
    abilityActivationChance: 0
  };
};
const calculateEnemyPower = (warMachine) => {
  const damagePower = Math.pow(warMachine.damage * 10, 0.7);
  const healthPower = Math.pow(warMachine.health, 0.7);
  const armorPower = Math.pow(warMachine.armor * 10, 0.7);
  return Math.floor(damagePower + healthPower + armorPower);
};
const getEnemySquad = (mission) => {
  const difficultyMultiplier = difficultyMultipliers[mission.difficulty];
  const baseMultiplier = difficultyMultiplier * Math.pow(1.2, mission.level - 1);
  const powerMultiplier = Math.pow(2, Math.floor((mission.level - 1) / 10));
  const statMultiplier = Math.pow(3, Math.floor((mission.level - 1) / 10));
  let totalPower = 0;
  const enemySquad = [];
  for (let i = 0; i < 5; i++) {
    const enemyWarMachine = getEnemyWarMachine(baseMultiplier);
    enemySquad.push({
      name: enemyWarMachine.name,
      damage: enemyWarMachine.damage * statMultiplier,
      maxHealth: enemyWarMachine.maxHealth * statMultiplier,
      health: enemyWarMachine.health * statMultiplier,
      armor: enemyWarMachine.armor * statMultiplier,
      abilityActivationChance: enemyWarMachine.abilityActivationChance
    });
    totalPower += calculateEnemyPower({
      damage: enemyWarMachine.damage * powerMultiplier,
      health: enemyWarMachine.health * powerMultiplier,
      armor: enemyWarMachine.armor * powerMultiplier
    });
  }
  return { warMachines: enemySquad, totalPower };
};
const getRequiredPower = (mission, enemySquad) => {
  if (mission.difficulty === "easy" && mission.level >= 11 && mission.level <= 30) {
    return enemySquad.totalPower * 0.5;
  }
  if (mission.difficulty !== "easy" || mission.level > 30) {
    return enemySquad.totalPower * 0.8;
  }
  return enemySquad.totalPower * 0.3;
};
const statusBreaks = ["underreq", "lose"];
const getMissionSummary = (squad, mission, options) => {
  const enemySquad = getEnemySquad(mission);
  const requiredPower = getRequiredPower(mission, enemySquad);
  if (!options?.ignoreRequirements && requiredPower > squad.totalPower) {
    return {
      status: "underreq",
      mission,
      rounds: 0,
      requiredPower
    };
  }
  const worstBattleResult = simulateCampaignBattle({
    playerWarMachines: structuredClone(squad.warMachines),
    enemyWarMachines: structuredClone(enemySquad.warMachines),
    abilityActivationChance: 0
  });
  if (worstBattleResult.status === "win") {
    return {
      ...worstBattleResult,
      mission,
      requiredPower
    };
  }
  const perfectBattleResult = simulateCampaignBattle({
    playerWarMachines: structuredClone(squad.warMachines),
    enemyWarMachines: structuredClone(enemySquad.warMachines),
    abilityActivationChance: 100
  });
  return {
    ...worstBattleResult,
    status: perfectBattleResult.status === "win" ? "can-win" : "lose",
    mission,
    requiredPower
  };
};
const getDifficultySummary = (squad, difficulty, options) => {
  const missions = [];
  for (let level = 1; level <= maxCampaignMissions; level++) {
    const summary = getMissionSummary(squad, { difficulty, level }, options);
    missions.push(summary);
    if (statusBreaks.includes(summary.status)) {
      return missions;
    }
  }
  return missions;
};
const simulateCampaignSummary = (squad, options) => {
  return {
    easy: getDifficultySummary(squad, "easy", options),
    normal: getDifficultySummary(squad, "normal", options),
    hard: getDifficultySummary(squad, "hard", options),
    insane: getDifficultySummary(squad, "insane", options),
    nightmare: getDifficultySummary(squad, "nightmare", options)
  };
};
const getTotalStars = (campaign) => {
  let stars = 0;
  for (const missions of Object.values(campaign)) {
    for (const mission of missions) {
      if (mission.status === "win" || mission.status === "can-win") {
        stars++;
      }
    }
  }
  return stars;
};
const catchError = (func) => {
  try {
    return [void 0, func()];
  } catch (error) {
    return [error, void 0];
  }
};
const average = (numbers) => {
  if (!numbers.length) {
    return 0;
  }
  const sum2 = numbers.reduce((acc, val) => acc + val, 0);
  return sum2 / numbers.length;
};
const warMachineSchema = z.object({
  name: z.string(),
  level: z.number().optional(),
  sacredCardLevel: z.number().optional(),
  lostInscriptionLevel: z.number().optional(),
  damageBlueprintLevel: z.number().optional(),
  healthBlueprintLevel: z.number().optional(),
  armorBlueprintLevel: z.number().optional(),
  rarity: z.enum(warMachineRarityData.list)
});
const crewHeroSchema = z.object({
  name: z.string(),
  attributeDamage: z.number().optional(),
  attributeHealth: z.number().optional(),
  attributeArmor: z.number().optional()
});
const artifactTypeSchema = z.object({
  name: z.string(),
  percents: z.object({
    30: z.number().optional(),
    35: z.number().optional(),
    40: z.number().optional(),
    45: z.number().optional(),
    50: z.number().optional(),
    55: z.number().optional(),
    60: z.number().optional(),
    65: z.number().optional()
  })
});
const gameDataSchema = z.object({
  warMachines: z.record(z.string(), warMachineSchema),
  crewHeroes: z.record(z.string(), crewHeroSchema),
  artifactTypes: z.record(z.string(), artifactTypeSchema)
});
const defaultWarMachines = {
  cloudfist: {
    name: "cloudfist",
    rarity: "common"
  },
  earthshatterer: {
    name: "earthshatterer",
    rarity: "common"
  },
  sentinel: {
    name: "sentinel",
    rarity: "common"
  },
  judgement: {
    name: "judgement",
    rarity: "common"
  },
  talos: {
    name: "talos",
    rarity: "common"
  },
  hunter: {
    name: "hunter",
    rarity: "common"
  },
  fortress: {
    name: "fortress",
    rarity: "common"
  },
  goliath: {
    name: "goliath",
    rarity: "common"
  },
  thunderclap: {
    name: "thunderclap",
    rarity: "common"
  },
  firecracker: {
    name: "firecracker",
    rarity: "common"
  },
  aegis: {
    name: "aegis",
    rarity: "common"
  },
  curator: {
    name: "curator",
    rarity: "common"
  },
  harvester: {
    name: "harvester",
    rarity: "common"
  }
};
const defaultHeroes = {
  talia: { name: "talia" },
  burt: { name: "burt" },
  solaine: { name: "solaine" },
  boris: { name: "boris" },
  benedictus: { name: "benedictus" },
  leo: { name: "leo" },
  muriel: { name: "muriel" },
  blaze: { name: "blaze" },
  luana: { name: "luana" },
  valerius: { name: "valerius" },
  astrid: { name: "astrid" },
  ina: { name: "ina" },
  fini: { name: "fini" },
  asmondai: { name: "asmondai" },
  danysa: { name: "danysa" },
  iseris: { name: "iseris" },
  belien: { name: "belien" },
  sely: { name: "sely" },
  randal: { name: "randal" },
  molly: { name: "molly" },
  layla: { name: "layla" },
  joe: { name: "joe" },
  hongyu: { name: "hongyu" },
  amun: { name: "amun" },
  panko: { name: "panko" },
  yavo: { name: "yavo" },
  cirilo: { name: "cirilo" },
  vilon: { name: "vilon" },
  anzo: { name: "anzo" },
  zelea: { name: "zelea" },
  zoruk: { name: "zoruk" },
  rickie: { name: "rickie" },
  jess: { name: "jess" },
  ledra: { name: "ledra" },
  yamanoth: { name: "yamanoth" },
  kramatak: { name: "kramatak" }
};
const defaultArtifactTypes = {
  damage: {
    name: "damage",
    percents: {}
  },
  health: {
    name: "health",
    percents: {}
  },
  armor: {
    name: "armor",
    percents: {}
  }
};
const defaultGameData = {
  warMachines: defaultWarMachines,
  crewHeroes: defaultHeroes,
  artifactTypes: defaultArtifactTypes
};
const storageKey = "data";
const parseStorageData = (value) => {
  const [jsonError, rawData] = catchError(() => JSON.parse(value));
  if (jsonError || !rawData || typeof rawData !== "object") {
    return;
  }
  const result = gameDataSchema.safeParse(rawData);
  if (result.success) {
    return result.data;
  }
};
const removeZeroValues = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== 0)
  );
};
const optionalWindow$1 = typeof window === "object" ? window : void 0;
const gameDataStore = createStore({
  context: parseStorageData(optionalWindow$1?.localStorage.getItem(storageKey) ?? "") ?? defaultGameData,
  on: {
    updateWarMachine: (context, event) => {
      return produce(context, (draft) => {
        const warMachine = draft.warMachines[event.name];
        if (warMachine) {
          Object.assign(warMachine, event.data);
        }
      });
    },
    updateWarMachineRarity: (context, event) => {
      return produce(context, (draft) => {
        const warMachine = draft.warMachines[event.name];
        if (warMachine) {
          warMachine.rarity = event.rarity;
        }
      });
    },
    updateCrewHero: (context, event) => {
      return produce(context, (draft) => {
        const hero = draft.crewHeroes[event.name];
        if (hero) {
          Object.assign(hero, event.data);
        }
      });
    },
    updateArtifactTypes: (context, event) => {
      return produce(context, (draft) => {
        const artifactType = draft.artifactTypes[event.name];
        if (artifactType) {
          Object.assign(artifactType.percents, event.data);
        }
      });
    },
    import: (context, event) => {
      return produce(context, (draft) => {
        if (event.warMachines) {
          draft.warMachines = defaultGameData.warMachines;
          for (const warMachine of Object.values(event.warMachines)) {
            const draftWarMachine = draft.warMachines[warMachine.name];
            if (draftWarMachine) {
              Object.assign(draftWarMachine, removeZeroValues(warMachine));
            }
          }
        }
        if (event.heroes) {
          draft.crewHeroes = defaultGameData.crewHeroes;
          for (const hero of Object.values(event.heroes)) {
            const draftHero = draft.crewHeroes[hero.name];
            if (draftHero) {
              Object.assign(draftHero, removeZeroValues(hero));
            }
          }
        }
        if (event.artifactTypes) {
          draft.artifactTypes = defaultGameData.artifactTypes;
          for (const artifactType of Object.values(event.artifactTypes)) {
            const draftArtifactType = draft.artifactTypes[artifactType.name];
            if (draftArtifactType) {
              Object.assign(
                draftArtifactType.percents,
                removeZeroValues(artifactType.percents)
              );
            }
          }
        }
      });
    }
  }
});
gameDataStore.subscribe((snapshot) => {
  const result = gameDataSchema.safeParse(snapshot.context);
  if (result.success) {
    window.localStorage.setItem(storageKey, JSON.stringify(result.data));
  }
});
const getPercentColumn = (rarity) => {
  const percentage = artifactTypeBaseData.toPercent[rarity];
  return {
    accessorKey: `${percentage}%`,
    header: `# of ${percentage}`,
    cell: function InputCell({ row }) {
      const attribute = row.original;
      const [tempData, setTempData] = useState();
      const trpc = useTRPC();
      const queryClient = useQueryClient();
      const { data } = useSuspenseQuery(
        trpc.artifact.findAll.queryOptions(void 0, {
          select: (artifacts) => artifacts.find((a) => a.attribute === attribute)?.items[rarity]
        })
      );
      const updateArtifact = useMutation(
        trpc.artifact.updateOne.mutationOptions({
          onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.artifact.pathFilter());
          }
        })
      );
      const displayValue = (tempData ?? data) || null;
      return /* @__PURE__ */ jsx(
        NumberFieldRoot,
        {
          value: displayValue,
          onValueChange: (value) => {
            const fallbackValue = displayValue === null ? 1 : 0;
            setTempData(value || fallbackValue);
          },
          onBlur: () => {
            if (tempData !== void 0) {
              updateArtifact.mutate({
                attribute,
                rarity,
                count: tempData
              });
            }
          },
          children: /* @__PURE__ */ jsx(NumberFieldInput, {})
        }
      );
    }
  };
};
const columns = [
  {
    id: "name",
    header: "Artifact Type",
    cell: ({ row }) => {
      return /* @__PURE__ */ jsx("span", { className: "capitalize", children: row.original });
    }
  },
  getPercentColumn("epic"),
  getPercentColumn("legendary"),
  getPercentColumn("mythic"),
  getPercentColumn("titan"),
  getPercentColumn("angel"),
  getPercentColumn("celestial"),
  getPercentColumn("immortal"),
  getPercentColumn("primordial")
];
const ArtifactTypesTable = ({ className }) => {
  return /* @__PURE__ */ jsx(
    DataTableRoot,
    {
      columns,
      data: ["damage", "health", "armor"],
      className: cn("[&_td]:p-1 max-w-[800px]", className),
      getRowId: (row) => row,
      children: /* @__PURE__ */ jsx(DataTableViewport, { children: /* @__PURE__ */ jsxs(DataTableTable, { children: [
        /* @__PURE__ */ jsx(DataTableTableHeader, { sticky: true }),
        /* @__PURE__ */ jsx(DataTableTableBody, { hoverEffect: "highlight" }),
        /* @__PURE__ */ jsx(DataTableTableEmpty, {})
      ] }) })
    }
  );
};
function WorkerWrapper$1(options) {
  return new Worker(
    "/assets/computeBestFormation-CSwD9JgD.js",
    {
      name: options?.name
    }
  );
}
const eventSchema$1 = z.object({
  type: z.literal("result"),
  data: z.object({
    campaignPower: z.number(),
    warMachines: z.array(
      z.object({
        name: z.string(),
        crew: z.array(z.string()),
        power: z.number(),
        damage: z.number(),
        health: z.number(),
        armor: z.number(),
        rarity: z.enum(warMachineRarityData.list)
      })
    )
  })
});
const invokeComputeBestFormation = (data, options) => {
  const worker = new WorkerWrapper$1();
  const signal = options?.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(1e4)]) : void 0;
  return new Promise(
    (resolve, reject) => {
      signal?.addEventListener("abort", () => {
        const message = signal.reason ? `Aborted: ${signal.reason}` : "Aborted";
        worker.terminate();
        reject(new Error(message));
      });
      worker.onmessage = (event) => {
        const handlers = {
          result: resolve
        };
        const { data: data2 } = eventSchema$1.safeParse(event.data);
        if (data2) {
          handlers[data2.type](data2.data);
        }
      };
      worker.postMessage([data]);
    }
  );
};
function WorkerWrapper(options) {
  return new Worker(
    "/assets/simulateDetailedMission-fCXgbK9V.js",
    {
      name: options?.name
    }
  );
}
const eventSchema = z.object({
  type: z.enum(["onChange", "result", "error"]),
  data: z.object({
    status: z.enum(["win", "can-win", "lose", "underreq"]),
    mission: z.object({
      level: z.number().min(1),
      difficulty: z.enum(
        difficulties
      )
    }),
    rounds: z.number(),
    requiredPower: z.number(),
    successChance: z.number(),
    totalBattleCount: z.number(),
    currentBattleCount: z.number()
  }).optional()
});
const invokeSimulateDetailedMission = (...[summary, warMachines, options]) => {
  const worker = new WorkerWrapper();
  return new Promise((resolve, reject) => {
    options?.signal?.addEventListener("abort", () => {
      const message = options.signal?.reason ? `Aborted: ${options.signal.reason}` : "Aborted";
      worker.terminate();
      reject(new Error(message));
    });
    worker.onmessage = (event) => {
      const { data, error } = eventSchema.safeParse(event.data);
      const handlers = {
        onChange: (data2) => {
          if (data2) {
            options?.onChange?.(data2);
          }
        },
        result: resolve,
        error: reject
      };
      if (error) {
        return reject(error);
      }
      if (data) {
        handlers[data.type](data.data);
      }
    };
    worker.postMessage([
      summary,
      warMachines,
      {
        totalSimulations: options?.totalSimulations
      }
    ]);
  });
};
const totalSimulations = 250;
const orderFromStrongestToWeakeast = (warMachines) => {
  return sort(
    warMachines,
    (warMachine) => warMachine.health + warMachine.armor * 10 + warMachine.damage * 10,
    true
  );
};
const findTargetStarFormation = async (data, targetStar, options) => {
  data = structuredClone(data);
  let successChance = 100;
  let needsAbilities = false;
  const currentWarMachines = Object.values(data.warMachines).filter(
    (wm) => wm.level
  );
  const currentBestCrew = await invokeComputeBestFormation(data, options);
  let team = orderFromStrongestToWeakeast(
    Object.values(currentBestCrew.warMachines)
  ).map((wm) => wm.name);
  const currentWarMachinesInTeam = currentWarMachines.filter(
    (wm) => team.includes(wm.name)
  );
  const warMachineInTeamLevels = currentWarMachinesInTeam.map(
    (wm) => wm.level ?? 0
  );
  const highestWarMachineLevelWarMachine = max(
    currentWarMachinesInTeam,
    (wm) => wm.level ?? 0
  );
  const averageWarMachineLevel = average(warMachineInTeamLevels);
  const rarityUpgrades = [];
  const warMachinesMetadata = {};
  for (const warMachine of currentWarMachines) {
    const level = warMachine.level ?? 0;
    const levelDifference = averageWarMachineLevel - level;
    warMachinesMetadata[warMachine.name] = {
      isMain: levelDifference <= 2
    };
  }
  if (highestWarMachineLevelWarMachine?.level) {
    for (const warMachine of currentWarMachinesInTeam) {
      const metadata = warMachinesMetadata[warMachine.name];
      if (!metadata || !warMachine.level || highestWarMachineLevelWarMachine.level <= warMachine.level) {
        continue;
      }
      const currentRarityLevel = warMachineRarityData.toLevel[warMachine.rarity];
      const nexRarity = warMachineRarityData.fromLevel[currentRarityLevel + 1];
      if (nexRarity) {
        const requiredLevel = warMachineRarityData.unlockLevel[nexRarity];
        if (warMachine.level >= requiredLevel) {
          rarityUpgrades.push(warMachine.name);
          continue;
        }
        if (warMachine.rarity === "common") {
          const highestRequiredLevel = warMachineRarityData.unlockLevel[highestWarMachineLevelWarMachine.rarity];
          const highestRarityLevel = warMachineRarityData.toLevel[highestWarMachineLevelWarMachine.rarity];
          const highestNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 1];
          if (highestNextRarity) {
            const highestNextRequiredLevel = warMachineRarityData.unlockLevel[highestNextRarity];
            const difference = highestNextRequiredLevel - highestRequiredLevel;
            if (highestWarMachineLevelWarMachine.level >= highestRequiredLevel + difference / 2) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        } else {
          const highestRarityLevel = warMachineRarityData.toLevel[highestWarMachineLevelWarMachine.rarity];
          const highestNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 1];
          const highestNextNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 2];
          if (highestNextRarity && highestNextNextRarity) {
            const highestRequiredLevel = warMachineRarityData.unlockLevel[highestNextRarity];
            const highestNextRequiredLevel = warMachineRarityData.unlockLevel[highestNextNextRarity];
            const difference = highestNextRequiredLevel - highestRequiredLevel;
            if (highestWarMachineLevelWarMachine.level >= highestRequiredLevel + difference / 2) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        }
      }
    }
    for (const warMachine of currentWarMachines) {
      if (team.includes(warMachine.name)) {
        continue;
      }
      const metadata = warMachinesMetadata[warMachine.name];
      if (!metadata || !warMachine.level || highestWarMachineLevelWarMachine.level <= warMachine.level) {
        continue;
      }
      const currentRarityLevel = warMachineRarityData.toLevel[warMachine.rarity];
      const nexRarity = warMachineRarityData.fromLevel[currentRarityLevel + 1];
      if (nexRarity) {
        const requiredLevel = warMachineRarityData.unlockLevel[nexRarity];
        if (warMachine.level >= requiredLevel) {
          rarityUpgrades.push(warMachine.name);
          continue;
        }
        if (warMachine.rarity === "common") {
          const highestRequiredLevel = warMachineRarityData.unlockLevel[highestWarMachineLevelWarMachine.rarity];
          const highestRarityLevel = warMachineRarityData.toLevel[highestWarMachineLevelWarMachine.rarity];
          const highestNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 1];
          if (highestNextRarity) {
            const highestNextRequiredLevel = warMachineRarityData.unlockLevel[highestNextRarity];
            const difference = highestNextRequiredLevel - highestRequiredLevel;
            if (highestWarMachineLevelWarMachine.level >= highestRequiredLevel + difference / 2) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        } else {
          const highestRarityLevel = warMachineRarityData.toLevel[highestWarMachineLevelWarMachine.rarity];
          const highestNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 1];
          const highestNextNextRarity = warMachineRarityData.fromLevel[highestRarityLevel + 2];
          if (highestNextRarity && highestNextNextRarity) {
            const highestRequiredLevel = warMachineRarityData.unlockLevel[highestNextRarity];
            const highestNextRequiredLevel = warMachineRarityData.unlockLevel[highestNextNextRarity];
            const difference = highestNextRequiredLevel - highestRequiredLevel;
            if (highestWarMachineLevelWarMachine.level >= highestRequiredLevel + difference / 2) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        }
      }
    }
  }
  team = team.filter((wm) => warMachinesMetadata[wm]?.isMain).slice(0, 2);
  for (const warMachineName of rarityUpgrades) {
    const warMachine = currentWarMachines.find(
      (wm) => wm.name === warMachineName
    );
    if (!warMachine?.level) {
      continue;
    }
    const currentRarityLevel = warMachineRarityData.toLevel[warMachine.rarity];
    const nexRarity = warMachineRarityData.fromLevel[currentRarityLevel + 1];
    const requiredLevel = warMachineRarityData.unlockLevel[nexRarity];
    if (requiredLevel && nexRarity) {
      if (warMachine.level < requiredLevel) {
        warMachine.level = requiredLevel;
      }
      warMachine.rarity = nexRarity;
    }
  }
  let stars = 0;
  let upgradeWarMachineIndex = 0;
  const canBeatTargetStar = () => {
    return stars >= targetStar.starLevel;
  };
  while (!canBeatTargetStar()) {
    if (options?.signal?.aborted) {
      console.log("aborted");
      break;
    }
    const computedData = await invokeComputeBestFormation(data, options);
    const simulationWarMachines = computedData.warMachines.slice().reverse().map((wm) => ({
      ...wm,
      maxHealth: wm.health,
      abilityActivationChance: warMachineRarityData.abilityActivationChance[wm.rarity]
    }));
    const summary = simulateCampaignSummary(
      {
        warMachines: simulationWarMachines,
        totalPower: computedData.campaignPower
      },
      { ignoreRequirements: options?.ignoreRequirements }
    );
    const getDetails = (mission) => ({
      ...mission,
      successChance: mission.status === "win" ? 100 : 0,
      totalBattleCount: 1,
      currentBattleCount: 1
    });
    const campaignResult = {
      easy: summary.easy.map(getDetails),
      normal: summary.normal.map(getDetails),
      hard: summary.hard.map(getDetails),
      insane: summary.insane.map(getDetails),
      nightmare: summary.nightmare.map(getDetails)
    };
    let missions = Object.values(campaignResult).flat().filter(
      (mission) => mission.status === "win" || mission.status === "can-win"
    );
    missions = sort(missions, (mission) => mission.successChance, true).slice(
      0,
      targetStar.starLevel
    );
    stars = missions.length;
    if (canBeatTargetStar()) {
      const handleChange = (data2) => {
        if (options?.signal?.aborted) {
          console.log("simulation aborted");
        }
        const missions3 = summary[data2.mission.difficulty];
        const missionIndex = missions3?.findIndex(
          (m) => m.mission.level === data2.mission.level
        );
        if (missionIndex !== void 0) {
          campaignResult[data2.mission.difficulty][missionIndex] = data2;
        }
      };
      try {
        await simulateDetailedCampaign(summary, simulationWarMachines, {
          ...options,
          onChange: handleChange,
          totalSimulations
        });
      } catch (error) {
        console.error("campaign simulation error:", error);
      }
      let missions2 = Object.values(campaignResult).flat().filter(
        (mission) => mission.successChance >= targetStar.minimumSuccessChance && (mission.status === "win" || mission.status === "can-win")
      );
      missions2 = sort(missions2, (mission) => mission.successChance, true).slice(
        0,
        targetStar.starLevel
      );
      stars = missions2.length;
      const hardestMission = min(missions2, (mission) => mission.successChance);
      if (hardestMission && successChance > hardestMission.successChance) {
        successChance = hardestMission.successChance;
        needsAbilities = hardestMission.status === "can-win";
      }
      if (canBeatTargetStar()) {
        break;
      }
    }
    if (upgradeWarMachineIndex >= team.length) {
      upgradeWarMachineIndex = 0;
    }
    const upgradeWarMachine = data.warMachines[team[upgradeWarMachineIndex++]];
    const baseData = warMachineBaseData.get(upgradeWarMachine.name);
    if (!baseData) {
      continue;
    }
    const currentRarityLevel = warMachineRarityData.toLevel[upgradeWarMachine.rarity];
    const nexRarity = warMachineRarityData.fromLevel[currentRarityLevel + 1];
    if (nexRarity && upgradeWarMachine.level) {
      const requiredLevel = warMachineRarityData.unlockLevel[nexRarity];
      if (upgradeWarMachine.level >= requiredLevel) {
        upgradeWarMachine.rarity = nexRarity;
        continue;
      }
    }
    upgradeWarMachine.level ??= 0;
    upgradeWarMachine.level++;
    if (baseData.specialization === "damage" && upgradeWarMachine.name === "cloudfist") {
      upgradeWarMachine.damageBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
    }
    if (baseData.specialization === "tank") {
      upgradeWarMachine.damageBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
      upgradeWarMachine.healthBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
      upgradeWarMachine.armorBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
    }
  }
  return {
    ...data,
    successChance,
    needsAbilities
  };
};
const base = 200;
const jewelRarityEffectMap = {
  common: 200,
  uncommon: 400,
  rare: 800,
  epic: 1600,
  legendary: 3200,
  mythic: 6400,
  titan: 12800,
  angel: 25600
};
const jewelLevelEffectMap = {
  0: base,
  1: base + 150,
  2: base + 200,
  3: base + 300,
  4: base + 400,
  5: base + 600,
  6: base + 800,
  7: base + 1200,
  8: base + 1600,
  9: base + 2200,
  10: base + 3200,
  11: base + 4800,
  12: base + 6400,
  13: base + 9600,
  14: base + 12800,
  15: base + 19200,
  16: base + 25600
};
const getLevelEffect = (level) => {
  if (level in jewelLevelEffectMap) {
    return jewelLevelEffectMap[level];
  }
  return 0;
};
const getJewelEffect = (jewel) => {
  if (!jewel) return 0;
  return getLevelEffect(jewel.level) + jewelRarityEffectMap[jewel.rarity];
};
const getHeroJewelEffects = (hero) => {
  const ankh = hero.jewels.find((j) => j.name === "ankh");
  const rune = hero.jewels.find((j) => j.name === "rune");
  const idol = hero.jewels.find((j) => j.name === "idol");
  const talisman = hero.jewels.find((j) => j.name === "talisman");
  const necklace = hero.jewels.find((j) => j.name === "necklace");
  const trinket = hero.jewels.find((j) => j.name === "trinket");
  const { specialization } = heroBaseData[hero.name];
  const damage = getJewelEffect(ankh) + getJewelEffect(talisman) + getJewelEffect(necklace);
  const health = getJewelEffect(rune) + getJewelEffect(talisman) + getJewelEffect(trinket);
  const armor = getJewelEffect(idol) + getJewelEffect(necklace) + getJewelEffect(trinket);
  return {
    damage: specialization === "damage" ? damage * 1.4 : damage,
    health: specialization === "healer" ? health * 1.4 : health,
    armor: specialization === "tank" ? armor * 1.4 : armor
  };
};
const useBestCampaignFormation = () => {
  const trpc = useTRPC();
  const { data: heroes } = useSuspenseQuery(trpc.hero.findAll.queryOptions());
  const { data: warMachines } = useSuspenseQuery(
    trpc.warMachine.findAll.queryOptions()
  );
  const { data: artifacts } = useSuspenseQuery(
    trpc.artifact.findAll.queryOptions()
  );
  return useQuery({
    queryKey: ["computeBestFormation", { warMachines, heroes, artifacts }],
    queryFn: ({ signal }) => {
      return invokeComputeBestFormation(
        {
          warMachines: Object.fromEntries(
            warMachines.map((wm) => [wm.name, wm])
          ),
          artifactTypes: Object.fromEntries(
            artifacts.map((a) => [
              a.attribute,
              {
                name: a.attribute,
                percents: Object.fromEntries(
                  Object.entries(a.items).map(([rarity, count]) => [
                    artifactTypeBaseData.toPercent[rarity],
                    count
                  ])
                )
              }
            ])
          ),
          crewHeroes: Object.fromEntries(
            heroes.map((hero) => {
              const attributes = getHeroJewelEffects(hero);
              return [
                hero.name,
                {
                  name: hero.name,
                  attributeDamage: attributes.damage,
                  attributeHealth: attributes.health,
                  attributeArmor: attributes.armor
                }
              ];
            })
          )
        },
        { signal }
      );
    },
    refetchOnWindowFocus: false
  });
};
const simulateDetailedCampaign = async (data, playerWarMachines, options) => {
  await Promise.all(
    Object.keys(data).map(async (difficulty) => {
      const difficultyData = data[difficulty];
      if (!difficultyData) {
        return;
      }
      await Promise.all(
        Object.values(difficultyData).map(async (summary) => {
          if (summary.status !== "can-win") {
            return;
          }
          await invokeSimulateDetailedMission(
            summary,
            playerWarMachines,
            options
          );
        })
      );
    })
  );
};
const useCampaignSimulation = (options) => {
  const { data } = useBestCampaignFormation();
  return useQuery({
    queryKey: ["simulateCampaign", data, options?.ignoreRequirements],
    queryFn: async ({ signal }) => {
      if (!data) {
        return null;
      }
      const warMachines = data.warMachines.slice().reverse().map((wm) => ({
        ...wm,
        maxHealth: wm.health,
        abilityActivationChance: warMachineRarityData.abilityActivationChance[wm.rarity]
      }));
      const summary = simulateCampaignSummary(
        {
          warMachines,
          totalPower: data.campaignPower
        },
        options
      );
      const getDetails = (mission) => ({
        ...mission,
        successChance: mission.status === "win" ? 100 : 0,
        totalBattleCount: 1,
        currentBattleCount: 1
      });
      const campaignResult = {
        easy: summary.easy.map(getDetails),
        normal: summary.normal.map(getDetails),
        hard: summary.hard.map(getDetails),
        insane: summary.insane.map(getDetails),
        nightmare: summary.nightmare.map(getDetails)
      };
      const handleChange = (data2) => {
        if (signal.aborted) {
          console.log("simulation aborted");
        }
        const missions = summary[data2.mission.difficulty];
        const missionIndex = missions.findIndex(
          (m) => m.mission.level === data2.mission.level
        );
        if (missionIndex !== void 0) {
          campaignResult[data2.mission.difficulty][missionIndex] = data2;
          options?.onChange?.(structuredClone(campaignResult));
        }
      };
      try {
        await simulateDetailedCampaign(summary, warMachines, {
          ...options,
          onChange: handleChange,
          signal
        });
      } catch (error) {
        console.error("campaign simulation error:", error);
        throw error;
      }
      return campaignResult;
    },
    refetchOnWindowFocus: false
  });
};
const storageKeys = {
  starLevel: "targetCampaign.starLevel",
  minimumSuccessChance: "targetCampaign.minimumSuccessChance"
};
const getSafeNumber = (str, defaultNumber) => {
  const number = Number(str ?? defaultNumber);
  return isNumber(number) ? number : defaultNumber;
};
const optionalWindow = typeof window === "object" ? window : void 0;
const defaultData$1 = {
  starLevel: getSafeNumber(
    optionalWindow?.localStorage.getItem(storageKeys.starLevel),
    0
  ),
  minimumSuccessChance: getSafeNumber(
    optionalWindow?.localStorage.getItem(storageKeys.minimumSuccessChance),
    0
  ),
  warMachines: defaultGameData.warMachines
};
const targetCampaignStore = createStore({
  context: defaultData$1,
  on: {
    changeTargetStar: (context, event) => {
      return produce(context, (draft) => {
        draft.starLevel = event.starLevel;
      });
    },
    changeMinimumSuccessChance: (context, event) => {
      return produce(context, (draft) => {
        draft.minimumSuccessChance = event.minimumSuccessChance;
      });
    },
    changeTargetFormation: (context, event) => {
      return produce(context, (draft) => {
        draft.warMachines = event.warMachines;
      });
    }
  }
});
targetCampaignStore.select((state) => state.starLevel).subscribe((starLevel) => {
  optionalWindow?.localStorage.setItem(
    storageKeys.starLevel,
    String(starLevel)
  );
});
targetCampaignStore.select((state) => state.minimumSuccessChance).subscribe((minimumSuccessChance) => {
  optionalWindow?.localStorage.setItem(
    storageKeys.minimumSuccessChance,
    String(minimumSuccessChance)
  );
});
const defaultData = {
  ignoreRequirements: false
};
const settingsStore = createStore({
  context: defaultData,
  on: {
    updateIgnoreRequirements: (context, event) => {
      return {
        ...context,
        ignoreRequirements: event.value
      };
    }
  }
});
const useTargetCampaignFormation = () => {
  const trpc = useTRPC();
  const { data: heroes } = useSuspenseQuery(trpc.hero.findAll.queryOptions());
  const { data: warMachines } = useSuspenseQuery(
    trpc.warMachine.findAll.queryOptions()
  );
  const { data: artifacts } = useSuspenseQuery(
    trpc.artifact.findAll.queryOptions()
  );
  const targetStarLevel = useSelector(
    targetCampaignStore,
    (state) => state.context.starLevel
  );
  const minimumSuccessChance = useSelector(
    targetCampaignStore,
    (state) => state.context.minimumSuccessChance
  );
  const ignoreRequirements = useSelector(
    settingsStore,
    (state) => state.context.ignoreRequirements
  );
  return useQuery({
    queryKey: [
      "findTargetStarFormation",
      { warMachines, heroes, artifacts },
      targetStarLevel,
      minimumSuccessChance,
      ignoreRequirements
    ],
    queryFn: async ({ signal }) => {
      try {
        const result = await findTargetStarFormation(
          {
            warMachines: Object.fromEntries(
              warMachines.map((wm) => [wm.name, wm])
            ),
            artifactTypes: Object.fromEntries(
              artifacts.map((a) => [
                a.attribute,
                {
                  name: a.attribute,
                  percents: Object.fromEntries(
                    Object.entries(a.items).map(([rarity, count]) => [
                      artifactTypeBaseData.toPercent[rarity],
                      count
                    ])
                  )
                }
              ])
            ),
            crewHeroes: Object.fromEntries(
              heroes.map((hero) => {
                const attributes = getHeroJewelEffects(hero);
                return [
                  hero.name,
                  {
                    name: hero.name,
                    attributeDamage: attributes.damage,
                    attributeHealth: attributes.health,
                    attributeArmor: attributes.armor
                  }
                ];
              })
            )
          },
          { starLevel: targetStarLevel, minimumSuccessChance },
          { signal, ignoreRequirements }
        );
        targetCampaignStore.trigger.changeTargetFormation({
          warMachines: result.warMachines
        });
        return result;
      } catch (error) {
        console.error("target campaign error:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false
  });
};
const rarityVariants$2 = cva(
  "flex size-6 items-center justify-center rounded font-bold",
  {
    variants: {
      rarity: {
        locked: "bg-rarity-locked text-white opacity-40",
        common: "bg-rarity-common text-white",
        uncommon: "bg-rarity-uncommon text-white",
        rare: "bg-rarity-rare text-white",
        epic: "bg-rarity-epic text-white",
        legendary: "bg-rarity-legendary text-white",
        mythic: "bg-rarity-mythic text-black",
        titan: "bg-rarity-titan text-black",
        angel: "bg-rarity-angel text-white"
      }
    },
    defaultVariants: {
      rarity: "common"
    }
  }
);
const numberFormatter$2 = new Intl.NumberFormat("en-US");
function defaultRenderValue(v) {
  return v;
}
const DiffItem = ({
  icon,
  current,
  target,
  renderValue = defaultRenderValue
}) => {
  if (current >= target) return null;
  const diffLevel = target - current;
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "size-6 text-center", children: icon }),
    renderValue(current),
    " ",
    "=>",
    " ",
    renderValue(target),
    /* @__PURE__ */ jsxs("span", { className: "ml-2 flex items-center justify-center text-green-400", children: [
      /* @__PURE__ */ jsx(ArrowBigUpIcon, { className: "size-5" }),
      diffLevel
    ] })
  ] });
};
const TargetWarMachinesTable = () => {
  const trpc = useTRPC();
  const { data: warMachines } = useSuspenseQuery(
    trpc.warMachine.findAll.queryOptions()
  );
  const currentWarMachines = Object.fromEntries(
    warMachines.map((wm) => [wm.name, wm])
  );
  useSelector(
    targetCampaignStore,
    (state) => {
      return Object.keys(state.context.warMachines).filter((name) => {
        const target = state.context.warMachines[name];
        const current = currentWarMachines[name];
        if (!target || !current) return false;
        return target.level !== current.level || target.damageBlueprintLevel !== current.damageBlueprintLevel || target.healthBlueprintLevel !== current.healthBlueprintLevel || target.armorBlueprintLevel !== current.armorBlueprintLevel || target.rarity !== current.rarity;
      });
    },
    isEqual
  );
  const warMachineList = useSelector(
    targetCampaignStore,
    (state) => {
      return Object.values(state.context.warMachines).filter((target) => {
        const current = currentWarMachines[target.name];
        if (!target || !current) return false;
        return target.level !== current.level || target.damageBlueprintLevel !== current.damageBlueprintLevel || target.healthBlueprintLevel !== current.healthBlueprintLevel || target.armorBlueprintLevel !== current.armorBlueprintLevel || target.rarity !== current.rarity;
      }).map((target) => {
        return {
          name: target.name,
          target,
          current: currentWarMachines[target.name]
        };
      });
    },
    isEqual
  );
  const { data, isLoading } = useCampaignSimulation();
  const enrichedWarMachines = warMachineList.map((warMachine) => {
    const resources = calculateResources(
      warMachine.current.level ?? 0,
      warMachine.target.level ?? 0
    );
    const damageBlueprints = calculateBlueprintCost(
      warMachine.current.damageBlueprintLevel ?? 0,
      warMachine.target.damageBlueprintLevel ?? 0
    );
    const healthBlueprints = calculateBlueprintCost(
      warMachine.current.healthBlueprintLevel ?? 0,
      warMachine.target.healthBlueprintLevel ?? 0
    );
    const armorBlueprints = calculateBlueprintCost(
      warMachine.current.armorBlueprintLevel ?? 0,
      warMachine.target.armorBlueprintLevel ?? 0
    );
    const totalBlueprints2 = damageBlueprints + healthBlueprints + armorBlueprints;
    const getEta = () => {
      const totalCampaignStarsPossible = data && !isLoading ? getTotalStars(data) : 0;
      if (totalCampaignStarsPossible <= 0) return 0;
      const requiredResources = calculateResources(
        warMachine.current.level ?? 0,
        warMachine.target.level ?? 0
      );
      return estimateTimeForUpgrade({
        stars: totalCampaignStarsPossible,
        emblems: 0,
        ownedResources: {
          screws: 0,
          cogs: 0,
          metal: 0,
          expeditionTokens: 0
        },
        requiredResources: {
          ...requiredResources,
          expeditionTokens: 0
        }
      });
    };
    return {
      ...warMachine,
      eta: getEta(),
      resources: {
        ...resources,
        blueprints: totalBlueprints2
      }
    };
  });
  const maxEta = Math.max(0, ...enrichedWarMachines.map((w) => w.eta));
  const maxScrews = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.screws)
  );
  const maxCogs = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.cogs)
  );
  const maxMetal = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.metal)
  );
  const totalExpeditionTokens = sum(
    enrichedWarMachines,
    (w) => w.resources.expeditionTokens
  );
  const totalBlueprints = sum(
    enrichedWarMachines,
    (w) => w.resources.blueprints
  );
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-center gap-6 md:justify-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        maxEta,
        " ",
        maxEta === 1 ? "day" : "days"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { className: "size-6", src: "/Component_Screw.webp", alt: "screw" }),
        numberFormatter$2.format(maxScrews)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { className: "size-6", src: "/Component_Cog.webp", alt: "cog" }),
        numberFormatter$2.format(maxCogs)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("img", { className: "size-6", src: "/Component_Metal.webp", alt: "metal" }),
        numberFormatter$2.format(maxMetal)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "size-6",
            src: "/ExpeditionToken.webp",
            alt: "expedition token"
          }
        ),
        numberFormatter$2.format(totalExpeditionTokens)
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "size-6",
            src: "/CurrencyBlueprint.webp",
            alt: "blueprint"
          }
        ),
        numberFormatter$2.format(totalBlueprints)
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-[repeat(auto-fit,250px)] justify-center gap-8 md:justify-start", children: enrichedWarMachines.map((warMachine) => {
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex flex-col items-center border p-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex w-full items-center justify-center", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "max-w-24 min-w-24 p-2",
                  src: `/war-machines/${warMachine.name}.webp`,
                  alt: warMachine.name
                }
              ),
              warMachine.eta > 0 && /* @__PURE__ */ jsxs("div", { className: "absolute top-0 right-0 text-shadow-sm", children: [
                warMachine.eta,
                " ",
                warMachine.eta === 1 ? "day" : "days"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex h-full w-full flex-col items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid", children: [
                /* @__PURE__ */ jsx(
                  DiffItem,
                  {
                    icon: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "L" }),
                    current: warMachine.current.level ?? 0,
                    target: warMachine.target.level ?? 0
                  }
                ),
                /* @__PURE__ */ jsx(
                  DiffItem,
                  {
                    icon: /* @__PURE__ */ jsx("img", { src: "/WarMachineAttackIcon.webp", alt: "attack" }),
                    current: warMachine.current.damageBlueprintLevel ?? 0,
                    target: warMachine.target.damageBlueprintLevel ?? 0
                  }
                ),
                /* @__PURE__ */ jsx(
                  DiffItem,
                  {
                    icon: /* @__PURE__ */ jsx("img", { src: "/WarMachineHealthIcon.webp", alt: "health" }),
                    current: warMachine.current.healthBlueprintLevel ?? 0,
                    target: warMachine.target.healthBlueprintLevel ?? 0
                  }
                ),
                /* @__PURE__ */ jsx(
                  DiffItem,
                  {
                    icon: /* @__PURE__ */ jsx("img", { src: "/WarMachineArmorIcon.webp", alt: "armor" }),
                    current: warMachine.current.armorBlueprintLevel ?? 0,
                    target: warMachine.target.armorBlueprintLevel ?? 0
                  }
                ),
                /* @__PURE__ */ jsx(
                  DiffItem,
                  {
                    icon: /* @__PURE__ */ jsx("span", { className: "font-bold", children: "R" }),
                    current: warMachineRarityData.toLevel[warMachine.current.rarity ?? 0],
                    target: warMachineRarityData.toLevel[warMachine.target.rarity ?? 0],
                    renderValue: (level) => {
                      const rarity = warMachineRarityData.fromLevel[level];
                      return /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: rarityVariants$2({
                            rarity
                          }),
                          children: rarity[0].toUpperCase()
                        }
                      );
                    }
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "size-6",
                      src: "/Component_Screw.webp",
                      alt: "screw"
                    }
                  ),
                  numberFormatter$2.format(warMachine.resources.screws)
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "size-6",
                      src: "/Component_Cog.webp",
                      alt: "cog"
                    }
                  ),
                  numberFormatter$2.format(warMachine.resources.cogs)
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "size-6",
                      src: "/Component_Metal.webp",
                      alt: "metal"
                    }
                  ),
                  numberFormatter$2.format(warMachine.resources.metal)
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "size-6",
                      src: "/ExpeditionToken.webp",
                      alt: "expedition token"
                    }
                  ),
                  numberFormatter$2.format(
                    warMachine.resources.expeditionTokens
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      className: "size-6",
                      src: "/CurrencyBlueprint.webp",
                      alt: "blueprint"
                    }
                  ),
                  numberFormatter$2.format(warMachine.resources.blueprints)
                ] })
              ] })
            ] })
          ]
        },
        warMachine.name
      );
    }) })
  ] });
};
const TargetCampaign = () => {
  const targetStar = useSelector(
    targetCampaignStore,
    (state) => state.context.starLevel
  );
  const minimumSuccessChance = useSelector(
    targetCampaignStore,
    (state) => state.context.minimumSuccessChance
  );
  const targetFormation = useTargetCampaignFormation();
  const getSuccessChanceMessage = () => {
    if (!targetFormation.data) {
      return null;
    }
    const { successChance, needsAbilities } = targetFormation.data;
    const parts = [`Success chance: ${Number(successChance.toFixed(2))}%`];
    if (successChance === 0 && needsAbilities) {
      parts.push("(can still win with abilities)");
    }
    return parts.join(" ");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TypographyH4, { children: "Target stars" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        Input,
        {
          value: targetStar,
          onChange: (e) => targetCampaignStore.trigger.changeTargetStar({
            starLevel: Number(e.currentTarget.value)
          }),
          className: "max-w-[10ch]"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(TypographyParagraph, { children: "Minimum success chance" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            value: minimumSuccessChance,
            onChange: (e) => targetCampaignStore.trigger.changeMinimumSuccessChance({
              minimumSuccessChance: Number(e.currentTarget.value)
            }),
            className: "max-w-[8ch]"
          }
        )
      ] }),
      targetFormation.data && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(TypographyParagraph, { children: getSuccessChanceMessage() }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4", children: [
      targetFormation.isLoading && /* @__PURE__ */ jsx(Spinner, {}),
      /* @__PURE__ */ jsx(TargetWarMachinesTable, {})
    ] })
  ] });
};
const numberFormatter$1 = Intl.NumberFormat("en-US");
const MissionResult = ({ summary }) => {
  const messageParts = [`Mission ${summary.mission.level}`];
  const isComputing = summary.currentBattleCount < summary.totalBattleCount;
  if (!isComputing) {
    if (summary.status === "underreq") {
      messageParts.push(
        `doesn't meet power requirements: ${numberFormatter$1.format(summary.requiredPower)}`
      );
    } else {
      messageParts.push(
        `chance to succeed: ${Number(summary.successChance.toFixed(2))}%`
      );
      if (summary.successChance === 0 && summary.status === "can-win") {
        messageParts.push("(can win with abilities)");
      }
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
    /* @__PURE__ */ jsx("div", { children: messageParts.join(" ") }),
    isComputing && /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: "simulating battles..." }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
        ProgressRoot,
        {
          className: "w-56",
          value: summary.currentBattleCount / summary.totalBattleCount * 100,
          children: /* @__PURE__ */ jsx(ProgressTrack, { children: /* @__PURE__ */ jsx(ProgressIndicator, {}) })
        }
      ) })
    ] })
  ] });
};
const difficultyVariants = cva("text-lg capitalize", {
  variants: {
    difficulty: {
      easy: "text-green-500",
      normal: "text-orange-500",
      hard: "text-red-500",
      insane: "text-purple-500 text-shadow-md text-shadow-red-500/20",
      nightmare: "text-red-500 text-shadow-md text-shadow-purple-600"
    }
  }
});
const DifficultyResult = ({ difficulty, missions }) => {
  let startIndex = missions.findIndex((mission) => {
    return mission.status === "underreq" || mission.status === "can-win";
  });
  if (!missions.at(startIndex)?.successChance) {
    startIndex--;
  }
  const subset = missions.slice(startIndex);
  const complete = subset.every((m) => m.successChance >= 100);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx("span", { className: difficultyVariants({ difficulty }), children: difficulty }),
      complete && /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(CheckIcon, { className: "text-green-500" }) })
    ] }),
    !complete && /* @__PURE__ */ jsx("div", { className: "mb-2", children: subset.map((summary) => /* @__PURE__ */ jsx(
      MissionResult,
      {
        difficulty,
        summary
      },
      summary.mission.level
    )) })
  ] });
};
const CampaignSimulation = () => {
  const ignoreRequirements = useSelector(
    settingsStore,
    (state) => state.context.ignoreRequirements
  );
  const [partialSimulationData, setPartialSimulationData] = useState({});
  const { data } = useCampaignSimulation({
    onChange: setPartialSimulationData,
    ignoreRequirements
  });
  const dataJson = useMemo(() => JSON.stringify(data ?? ""), [data]);
  const totalCampaignStarsPossible = useMemo(() => {
    return getTotalStars(data ?? partialSimulationData);
  }, [data, partialSimulationData]);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-4 inline-flex flex-col gap-0.5 font-bold", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "Total campaign stars possible: ",
        totalCampaignStarsPossible
      ] }),
      /* @__PURE__ */ jsxs(Label, { children: [
        "Ignore requirements",
        /* @__PURE__ */ jsx(
          Switch,
          {
            checked: ignoreRequirements,
            onCheckedChange: (value) => settingsStore.trigger.updateIgnoreRequirements({ value })
          }
        )
      ] })
    ] }),
    Object.entries(data ?? partialSimulationData).map(
      ([difficulty, data2]) => /* @__PURE__ */ jsx(
        DifficultyResult,
        {
          difficulty,
          missions: data2
        },
        difficulty
      )
    )
  ] }, dataJson);
};
const heroesStore = createStore({
  context: {
    heroCards: {}
  },
  on: {
    addCard: (context, event) => {
      return {
        ...context,
        heroCards: {
          ...context.heroCards,
          [event.heroName]: event.element
        }
      };
    },
    removeCard: (context, event) => {
      const newContext = {
        ...context,
        heroCards: {
          ...context.heroCards
        }
      };
      delete newContext.heroCards[event.heroName];
      return newContext;
    }
  }
});
const numberFormatter = Intl.NumberFormat("en-US");
const WarMachinesFormation = () => {
  const { data } = useBestCampaignFormation();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: data && Object.values(data.warMachines).map((warMachine) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          className: "size-16 mb-2",
          src: `/war-machines/${warMachine.name}.webp`,
          alt: warMachine.name
        }
      ),
      warMachine.crew.map((heroName) => /* @__PURE__ */ jsx(
        "img",
        {
          className: "size-16 cursor-pointer",
          src: `/heroes/${heroName}.webp`,
          alt: heroName,
          onClick: () => {
            const element = heroesStore.getSnapshot().context.heroCards[heroName];
            element?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "nearest"
            });
            element?.querySelector("input")?.focus();
          }
        },
        heroName
      ))
    ] }, warMachine.name)) }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Campaign Power: ",
      numberFormatter.format(data?.campaignPower ?? 0)
    ] })
  ] });
};
const WarMachinesResult = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(TypographyH4, { children: "Likely Best Results" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap space-x-4", children: [
      /* @__PURE__ */ jsx(WarMachinesFormation, {}),
      /* @__PURE__ */ jsx(CampaignSimulation, {})
    ] })
  ] });
};
const ZScrollArea = ({
  vertical,
  horizontal,
  shadow,
  slotProps,
  ...props
}) => {
  const getDefaultShadow = () => {
    if (vertical && horizontal) return true;
    if (vertical) return "y";
    if (horizontal) return "x";
  };
  return /* @__PURE__ */ jsxs(ScrollAreaRoot, { ...slotProps?.root, children: [
    /* @__PURE__ */ jsx(ScrollAreaViewport, { shadow: shadow ?? getDefaultShadow(), children: /* @__PURE__ */ jsx(ScrollAreaContent, { ...props }) }),
    vertical && /* @__PURE__ */ jsx(ScrollAreaScrollbar, { children: /* @__PURE__ */ jsx(ScrollAreaThumb, {}) }),
    horizontal && /* @__PURE__ */ jsx(ScrollAreaScrollbar, { orientation: "horizontal", children: /* @__PURE__ */ jsx(ScrollAreaThumb, {}) }),
    vertical && horizontal && /* @__PURE__ */ jsx(ScrollAreaCorner, {})
  ] });
};
const BadgeInput = ({
  label,
  className,
  slotProps,
  addon,
  ...props
}) => {
  const timeoutRef = useRef(void 0);
  return /* @__PURE__ */ jsxs(
    InputGroupRoot,
    {
      className: cn(
        "group bg-background-light/70 h-auto rounded-full",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          InputGroupAddon,
          {
            className: cn(
              "py-0.5 text-white",
              typeof label === "string" ? "pl-1.5" : "pl-1"
            ),
            children: label
          }
        ),
        addon && /* @__PURE__ */ jsx(InputGroupAddon, { className: "py-0.5 pl-1 text-white", children: addon }),
        /* @__PURE__ */ jsx(NumberFieldRoot, { largeStep: 5, defaultValue: 0, ...props, children: /* @__PURE__ */ jsx(
          InputGroupInput,
          {
            render: /* @__PURE__ */ jsx(NumberFieldInput, {}),
            onFocus: (e) => setTimeout(() => e.target.select(), 0),
            onMouseEnter: (e) => {
              const { currentTarget } = e;
              clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => currentTarget.focus(), 500);
            },
            onMouseLeave: () => clearTimeout(timeoutRef.current),
            ...slotProps?.input,
            className: cn("w-[4ch] px-1 py-0", slotProps?.input?.className)
          }
        ) })
      ]
    }
  );
};
const rarityVariants$1 = tv({
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
      angel: "bg-rarity-angel"
    }
  }
});
const valueProps = {
  level: {
    button: "L",
    nextValueType: "rarityLevel"
  },
  rarityLevel: {
    button: "R",
    nextValueType: "level"
  }
};
const JewelInput = ({
  icon,
  level,
  onLevelChange,
  rarityLevel,
  onRarityLevelChange
}) => {
  const [valueType, setValueType] = useState("level");
  const { button, nextValueType } = valueProps[valueType];
  const value = {
    level,
    rarityLevel
  }[valueType];
  const onValueChange = {
    level: onLevelChange,
    rarityLevel: onRarityLevelChange
  }[valueType];
  return /* @__PURE__ */ jsx(
    BadgeInput,
    {
      value,
      onValueChange: (value2) => onValueChange(value2 ?? 0),
      label: /* @__PURE__ */ jsx(
        "img",
        {
          ...icon,
          className: rarityVariants$1({
            className: "h-5.5 min-w-5.5 object-contain rounded-full p-0.5",
            rarity: warMachineRarityData.fromLevel[rarityLevel ?? 0]
          })
        }
      ),
      addon: /* @__PURE__ */ jsx(
        Button,
        {
          className: "cursor-pointer ml-1 p-0 h-auto",
          appearance: "ghost",
          onClick: () => setValueType(nextValueType),
          children: button
        }
      ),
      slotProps: {
        input: { className: "w-[3ch]" }
      }
    }
  );
};
const HeroCard = ({ hero }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateHero = useMutation(
    trpc.hero.updateOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.hero.pathFilter());
      }
    })
  );
  const [tempData, setTempData] = useState();
  const handleChangeJewel = (jewelName, fieldName) => (value) => {
    setTempData((prevData) => {
      if (prevData?.jewels?.some((j) => j.name === jewelName)) {
        return {
          ...prevData,
          jewels: prevData.jewels.map((j) => {
            if (j.name !== jewelName) return j;
            return { ...j, [fieldName]: value };
          })
        };
      }
      if ("jewels" in hero && hero.jewels.some((j) => j.name === jewelName)) {
        return {
          ...prevData,
          jewels: hero.jewels.map((j) => {
            if (j.name !== jewelName) return j;
            return { ...j, [fieldName]: value };
          })
        };
      }
      return {
        ...prevData,
        jewels: [
          ...prevData?.jewels ?? [],
          {
            name: jewelName,
            tier: jewelBaseData.toTier[jewelName],
            level: 0,
            rarity: "common",
            [fieldName]: value
          }
        ]
      };
    });
  };
  const jewelMap = /* @__PURE__ */ new Map();
  if ("jewels" in hero) {
    for (const jewel of hero.jewels) {
      jewelMap.set(jewel.name, jewel);
    }
  }
  for (const jewel of tempData?.jewels ?? []) {
    jewelMap.set(jewel.name, jewel);
  }
  const data = {
    ...hero,
    ...tempData,
    jewels: [...jewelMap.values()]
  };
  const jewels = Object.fromEntries(
    data.jewels.map((j) => [j.name, j])
  );
  const onBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget) || !tempData) return;
    updateHero.mutate(data);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: (element) => {
        if (element)
          heroesStore.trigger.addCard({ heroName: hero.name, element });
        else heroesStore.trigger.removeCard({ heroName: hero.name });
      },
      className: cn(
        `relative transition-colors flex flex-col rounded-sm select-none p-0.5 bg-background-light/70
        focus-within:outline-2 focus-within:outline-primary! focus-within:outline-offset-2`,
        !("jewels" in hero) && "opacity-40"
      ),
      onBlur,
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            className: "absolute inset-0 p-3",
            src: `/heroes/${hero.name}.webp`,
            alt: hero.name
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "text-center isolate capitalize text-lg text-shadow-md text-shadow-black", children: hero.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 *:w-min", children: [
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/WarMachineAttackIcon.webp",
                  alt: "attack"
                },
                level: jewels.ankh?.level ?? 0,
                onLevelChange: handleChangeJewel("ankh", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.ankh?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "ankh",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            ),
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/WarMachineHealthIcon.webp",
                  alt: "health"
                },
                level: jewels.rune?.level ?? 0,
                onLevelChange: handleChangeJewel("rune", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.rune?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "rune",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            ),
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/WarMachineArmorIcon.webp",
                  alt: "armor"
                },
                level: jewels.idol?.level ?? 0,
                onLevelChange: handleChangeJewel("idol", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.idol?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "idol",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 *:w-min", children: [
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/AttackAndHealth.webp",
                  alt: "attack and health"
                },
                level: jewels.talisman?.level ?? 0,
                onLevelChange: handleChangeJewel("talisman", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.talisman?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "talisman",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            ),
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/AttackAndArmor.webp",
                  alt: "attack and armor"
                },
                level: jewels.necklace?.level ?? 0,
                onLevelChange: handleChangeJewel("necklace", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.necklace?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "necklace",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            ),
            /* @__PURE__ */ jsx(
              JewelInput,
              {
                icon: {
                  src: "/HealthAndArmor.webp",
                  alt: "health and armor"
                },
                level: jewels.trinket?.level ?? 0,
                onLevelChange: handleChangeJewel("trinket", "level"),
                rarityLevel: warMachineRarityData.toLevel[jewels.trinket?.rarity ?? "common"],
                onRarityLevelChange: (rarityLevel) => handleChangeJewel(
                  "trinket",
                  "rarity"
                )(warMachineRarityData.fromLevel[rarityLevel])
              }
            )
          ] })
        ] })
      ]
    }
  );
};
const heroNames = Object.keys(heroBaseData);
const getWeight$1 = (hero) => {
  if (!("level" in hero)) return -1;
  return 0;
};
const HeroesList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hero.findAll.queryOptions());
  const heroes = useMemo(() => {
    return sort(
      heroNames.map((name) => data.find((wm) => wm.name === name) ?? { name }),
      getWeight$1,
      true
    );
  }, [data]);
  const [limit, setLimit] = useState(2);
  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => {
      setLimit((prevLimit) => {
        const newLimit = prevLimit + 5;
        if (newLimit >= heroNames.length) {
          clearInterval(interval);
        }
        return newLimit;
      });
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [data]);
  return /* @__PURE__ */ jsx(
    ZScrollArea,
    {
      className: "max-h-96 p-2",
      slotProps: { root: { className: "outline-none" } },
      children: /* @__PURE__ */ jsx("div", { className: "grid auto-rows-[130px] grid-cols-[repeat(auto-fit,130px)] gap-4", children: heroes.map(
        (hero, index) => index <= limit ? /* @__PURE__ */ jsx(HeroCard, { hero }, hero.name) : /* @__PURE__ */ jsx(Skeleton, {}, hero.name)
      ) })
    }
  );
};
const rarityVariants = tv({
  base: "relative transition-colors place-content-between rounded-sm select-none",
  variants: {
    rarity: {
      locked: "bg-rarity-locked text-white opacity-40",
      common: "bg-rarity-common text-white",
      uncommon: "bg-rarity-uncommon text-white",
      rare: "bg-rarity-rare text-white",
      epic: "bg-rarity-epic text-white",
      legendary: "bg-rarity-legendary text-white",
      mythic: "bg-rarity-mythic text-white",
      titan: "bg-rarity-titan text-white",
      angel: "bg-rarity-angel text-white"
    }
  }
});
const WarMachineCard = ({ warMachine }) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateWarMachine = useMutation(
    trpc.warMachine.updateOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.warMachine.pathFilter());
      }
    })
  );
  const [tempData, setTempData] = useState();
  const handleChange = (field) => (value) => {
    setTempData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };
  const data = {
    ...warMachine,
    ...tempData
  };
  const onBlur = (e) => {
    if (e.currentTarget.contains(e.relatedTarget) || !tempData) return;
    updateWarMachine.mutate(data);
  };
  const getRarity = () => {
    if (data.rarity) return data.rarity;
    if (data.level) return "common";
    return "locked";
  };
  return /* @__PURE__ */ jsxs("div", { className: rarityVariants({ rarity: getRarity() }), onBlur, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "absolute inset-0 p-3",
        src: `/war-machines/${warMachine.name}.webp`,
        alt: warMachine.name
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2 p-0.5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: "L",
            value: data.level ?? 0,
            onValueChange: handleChange("level")
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: "R",
            value: warMachineRarityData.toLevel[data.rarity],
            onValueChange: (value) => {
              if (isNumber(value) && value in warMachineRarityData.fromLevel) {
                handleChange("rarity")(
                  warMachineRarityData.fromLevel[value]
                );
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-5 min-w-5 object-contain",
                src: "/SacredCards.webp",
                alt: "sacred cardds"
              }
            ),
            value: data.sacredCardLevel,
            onValueChange: handleChange("sacredCardLevel")
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-5 min-w-5 object-contain",
                src: "/LostInscription.webp",
                alt: "lost inscription"
              }
            ),
            value: data.lostInscriptionLevel,
            onValueChange: handleChange("lostInscriptionLevel")
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-5 min-w-5 object-contain",
                src: "/WarMachineAttackIcon.webp",
                alt: "attack"
              }
            ),
            value: data.damageBlueprintLevel,
            onValueChange: handleChange("damageBlueprintLevel")
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-5 min-w-5 object-contain",
                src: "/WarMachineHealthIcon.webp",
                alt: "health"
              }
            ),
            value: data.healthBlueprintLevel,
            onValueChange: handleChange("healthBlueprintLevel")
          }
        ),
        /* @__PURE__ */ jsx(
          BadgeInput,
          {
            label: /* @__PURE__ */ jsx(
              "img",
              {
                className: "h-5 min-w-5 object-contain",
                src: "/WarMachineArmorIcon.webp",
                alt: "armor"
              }
            ),
            value: data.armorBlueprintLevel,
            onValueChange: handleChange("armorBlueprintLevel")
          }
        )
      ] })
    ] })
  ] });
};
const warMachineNames = [...warMachineBaseData.keys()];
const getWeight = (warMachine) => {
  if (!("level" in warMachine)) return -1;
  const rarityWeight = warMachineRarityData.toLevel[warMachine.rarity] * 1e5;
  const damageWeight = warMachine.damageBlueprintLevel * 5;
  const healthWeight = warMachine.healthBlueprintLevel;
  const armorWeight = warMachine.armorBlueprintLevel * 5;
  return rarityWeight + damageWeight + healthWeight + armorWeight + warMachine.level;
};
const WarMachinesList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.warMachine.findAll.queryOptions());
  const warMachines = warMachineNames.map(
    (name) => data.find((wm) => wm.name === name) ?? { name }
  );
  return /* @__PURE__ */ jsx("div", { className: "grid auto-rows-[130px] grid-cols-[repeat(auto-fit,130px)] gap-6", children: sort(warMachines, getWeight, true).map((warMachine) => /* @__PURE__ */ jsx(WarMachineCard, { warMachine }, warMachine.name)) });
};
const tabs = {
  warMachines: "warMachines",
  heroes: "heroes",
  artifacts: "artifacts"
};
const WarMachines = () => {
  return /* @__PURE__ */ jsxs("div", { className: "container mx-auto space-y-4 px-2 pt-8 pb-4 md:px-0", children: [
    /* @__PURE__ */ jsxs(TabsRoot, { defaultValue: tabs.warMachines, children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: tabs.warMachines, children: "War Machines" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: tabs.heroes, children: "Heroes" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: tabs.artifacts, children: "Artifacts" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: tabs.warMachines, children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(WarMachinesList, {}) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: tabs.heroes, children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(HeroesList, {}) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: tabs.artifacts, children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(ArtifactTypesTable, {}) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(WarMachinesResult, {}) }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Separator, { className: "my-8" }) }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(TargetCampaign, {}) }) })
  ] });
};
function CampaignPage() {
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsx(WarMachines, {}) }) });
}
export {
  CampaignPage as component
};
