import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, Suspense } from "react";
import { sort, isNumber } from "radash";
import { CheckIcon, XIcon } from "lucide-react";
import "clsx";
import { c as cn, I as Input, p as createToastManager, B as Button, q as useToastManager, r as ToastIcon, d as useTRPC, l as Skeleton, C as CardRoot, e as Switch, F as FieldRoot, o as Separator, N as NumberFieldInput, s as SelectTrigger, t as SelectContent, v as SelectItem, S as Spinner } from "./router-Ctomkcxc.js";
import { Field, Select, Toast } from "@base-ui/react";
import { N as NumberFieldRoot } from "./NumberFieldRoot-BHG6u1Lv.js";
import { useSuspenseQuery, useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import "superjson";
import "@tanstack/react-router";
import "@trpc/client";
import "@trpc/tanstack-react-query";
import "tailwind-variants";
import "tailwind-merge";
import "@base-ui/react/tabs";
import "@tanstack/react-query-devtools";
import "@tanstack/react-router-devtools";
import "@trpc/server/adapters/fetch";
import "zod";
import "flat";
import "execa";
import "dotenv/config";
import "@t3-oss/env-core";
import "mongodb";
import "papr";
import "neverthrow";
import "munkres-js";
import "@trpc/server";
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        `@container/card-header grid auto-rows-min grid-rows-[auto_auto]
        items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto]
        [.border-b]:pb-6`,
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
const FieldControl = ({
  className,
  color,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Field.Control,
    {
      "data-slot": "field-control",
      render: /* @__PURE__ */ jsx(Input, { color, "data-slot": "field-control" }),
      ...props,
      className: cn("", className)
    }
  );
};
const FieldLabel = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    Field.Label,
    {
      "data-slot": "field-label",
      ...props,
      className: cn(
        `text-sm font-medium
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:flex
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:items-center
        has-[switch,checkbox,radio,[role=switch],[role=checkbox],[role=radio]]:gap-1`,
        className
      )
    }
  );
};
function SelectRoot(props) {
  return /* @__PURE__ */ jsx(Select.Root, { "data-slot": "select-root", ...props });
}
function SelectValue(props) {
  return /* @__PURE__ */ jsx(Select.Value, { "data-slot": "select-value", ...props });
}
const TypographyH1 = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx(
    "h1",
    {
      className: cn(
        "scroll-m-20 text-4xl font-bold tracking-tight text-balance",
        className
      ),
      ...props
    }
  );
};
function AnchoredToasts() {
  const { toasts } = useToastManager();
  return /* @__PURE__ */ jsx(Toast.Portal, { children: /* @__PURE__ */ jsx(Toast.Viewport, { className: "outline-0", children: toasts.map((toast) => /* @__PURE__ */ jsx(
    Toast.Positioner,
    {
      toast,
      className: "z-[calc(1000-var(--toast-index))]",
      children: /* @__PURE__ */ jsxs(Toast.Root, { toast, children: [
        /* @__PURE__ */ jsx(
          Toast.Arrow,
          {
            className: "bg-background-light z-50 size-2.5 rounded-[2px]\n                  shadow-md data-[side=bottom]:-top-1\n                  data-[side=bottom]:rotate-45 data-[side=left]:-right-1\n                  data-[side=left]:rotate-45 data-[side=right]:-left-1\n                  data-[side=right]:-rotate-45 data-[side=top]:-bottom-1\n                  data-[side=top]:-rotate-45"
          }
        ),
        /* @__PURE__ */ jsxs(
          Toast.Content,
          {
            className: "bg-background-light text-tooltip-foreground relative\n                  z-50 flex h-(--popup-height,auto) w-fit max-w-[500px]\n                  origin-(--transform-origin) items-center rounded-md px-3\n                  py-1.5 text-xs text-balance\n                  transition-[opacity,transform,width,height]\n                  data-ending-style:scale-90 data-ending-style:opacity-0\n                  data-instant:transition-none data-starting-style:scale-90\n                  data-starting-style:opacity-0",
            children: [
              /* @__PURE__ */ jsx(ToastIcon, { type: toast.type, className: "mr-2" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(Toast.Title, {}),
                /* @__PURE__ */ jsx(Toast.Description, {})
              ] })
            ]
          }
        )
      ] })
    },
    toast.id
  )) }) });
}
const ToastButton = ({
  onClick,
  disabled: disabledProps,
  disabledByToast: disabledByToastProps,
  ...props
}) => {
  const [toastManager] = useState(() => createToastManager());
  const [toastId, setToastId] = useState();
  const buttonRef = useRef(null);
  const toastOpen = !!toastId;
  const disabledByToast = disabledByToastProps && toastOpen;
  const disabled = disabledProps || disabledByToast;
  function handleClick(event) {
    if (toastId) {
      toastManager.close(toastId);
    }
    const adder = (add) => (data) => {
      const newToastId = add.call(toastManager, {
        timeout: 1500,
        ...data,
        positionerProps: {
          anchor: buttonRef.current,
          sideOffset: 8,
          ...data.positionerProps
        },
        onClose() {
          setToastId(void 0);
          data.onClose?.();
        }
      });
      setToastId(newToastId);
      return newToastId;
    };
    onClick?.(event, {
      ...toastManager,
      add: adder(toastManager.add),
      success: adder(toastManager.success),
      error: adder(toastManager.error),
      info: adder(toastManager.info),
      warning: adder(toastManager.warning),
      update: toastManager.update.bind(toastManager),
      close: toastManager.close.bind(toastManager),
      promise: toastManager.promise.bind(toastManager)
    });
  }
  return /* @__PURE__ */ jsxs(Toast.Provider, { toastManager, children: [
    /* @__PURE__ */ jsx(AnchoredToasts, {}),
    /* @__PURE__ */ jsx(
      Button,
      {
        ref: buttonRef,
        focusableWhenDisabled: disabledByToast,
        ...props,
        disabled,
        onClick: handleClick
      }
    )
  ] });
};
const useBotConfig = () => {
  const trpc = useTRPC();
  const [optimisticConfig, setOptimisticConfig] = useState();
  const optimisticDataUpdatedAt = useRef(0);
  const {
    data: serverConfig,
    dataUpdatedAt,
    refetch
  } = useSuspenseQuery(trpc.bot.findConfig.queryOptions());
  const config = optimisticDataUpdatedAt.current > dataUpdatedAt ? optimisticConfig ?? serverConfig : serverConfig;
  const setOptimisticData = (dispatch) => {
    if (typeof dispatch !== "function") {
      optimisticDataUpdatedAt.current = Date.now();
      setOptimisticConfig(dispatch);
      return;
    }
    setOptimisticConfig((prevConfig) => {
      optimisticDataUpdatedAt.current = Date.now();
      return dispatch(prevConfig);
    });
  };
  return {
    data: config,
    serverData: serverConfig,
    optimisticData: optimisticConfig,
    setOptimisticData,
    refetch
  };
};
const useUpdateBotConfig = (config) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateConfigMutation = useMutation(
    trpc.bot.updatePartial.mutationOptions({
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(trpc.bot.findConfig.pathFilter());
        }, 3e3);
      }
    })
  );
  const updateConfig = (data) => {
    const serverConfig = config.serverData;
    if (!serverConfig) {
      return;
    }
    config.setOptimisticData((prevConfig) => {
      const conf = prevConfig ?? serverConfig;
      const newSession = {
        ...serverConfig.session,
        ...data.session
      };
      if (data.session?.id) {
        newSession.status = "idle";
      }
      return {
        ...conf,
        ...data,
        session: newSession,
        features: {
          alchemyExperiment: {
            ...serverConfig.features.alchemyExperiment,
            ...data.features?.alchemyExperiment
          },
          campaignLoot: {
            ...serverConfig.features.campaignLoot,
            ...data.features?.campaignLoot
          },
          campaignMission: {
            ...serverConfig.features.campaignMission,
            ...data.features?.campaignMission
          },
          engineerTools: {
            ...serverConfig.features.engineerTools,
            ...data.features?.engineerTools
          },
          firestoneResearch: {
            ...serverConfig.features.firestoneResearch,
            ...data.features?.firestoneResearch
          },
          guardianTraining: {
            ...serverConfig.features.guardianTraining,
            ...data.features?.guardianTraining
          },
          guildExpedition: {
            ...serverConfig.features.guildExpedition,
            ...data.features?.guildExpedition
          },
          mapMission: {
            ...serverConfig.features.mapMission,
            ...data.features?.mapMission
          },
          oracleRitual: {
            ...serverConfig.features.oracleRitual,
            ...data.features?.oracleRitual
          },
          pickaxesClaiming: {
            ...serverConfig.features.pickaxesClaiming,
            ...data.features?.pickaxesClaiming
          }
        }
      };
    });
    updateConfigMutation.mutate({
      _id: serverConfig._id,
      data
    });
  };
  return updateConfig;
};
const difficultyOrder = {
  easy: 0,
  normal: 1,
  hard: 2,
  insane: 3,
  nightmare: 4
};
const skeletons = /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[125px] h-4.5" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[101px] h-4.5" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[128px] h-4.5" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[132px] h-4.5" })
] });
const MissionList = () => {
  const trpc = useTRPC();
  const { data: lastMissions, isFetching } = useQuery(
    trpc.bot.findLastMissions.queryOptions(void 0, {
      refetchInterval: 5e3
    })
  );
  return /* @__PURE__ */ jsxs("div", { children: [
    isFetching && !lastMissions && skeletons,
    /* @__PURE__ */ jsx("div", { children: sort(lastMissions ?? [], (m) => difficultyOrder[m.difficulty]).map(
      (mission) => /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxs("span", { className: "capitalize", children: [
          mission.difficulty,
          " ",
          mission.level,
          ": ",
          mission.attempts
        ] }),
        mission.wonAt && /* @__PURE__ */ jsx(CheckIcon, { className: "text-success" })
      ] }, mission.difficulty)
    ) })
  ] });
};
const guardians = {
  auto: "Auto",
  Vermillion: "Vermillion",
  Grace: "Grace",
  Ankaa: "Ankaa",
  Azhar: "Azhar"
};
function BotConfig() {
  const trpc = useTRPC();
  const config = useBotConfig();
  const updateConfig = useUpdateBotConfig(config);
  const restartMutation = useMutation(trpc.bot.restart.mutationOptions());
  const toggleFeature = (feature) => (enabled) => {
    updateConfig({
      features: {
        [feature]: { enabled }
      }
    });
  };
  const handleNumberChange = (getData) => {
    return (value) => {
      const number = Number(value);
      if (value && isNumber(number)) {
        updateConfig(getData(number));
      }
    };
  };
  const handleToggleAll = (enabled) => {
    updateConfig({
      features: {
        alchemyExperiment: { enabled },
        campaignLoot: { enabled },
        campaignMission: { enabled },
        engineerTools: { enabled },
        firestoneResearch: { enabled },
        guardianTraining: { enabled },
        guildExpedition: { enabled },
        mapMission: { enabled },
        oracleRitual: { enabled },
        pickaxesClaiming: { enabled }
      }
    });
  };
  const renderSessionStatus = () => {
    if (!config.data) return;
    const icons = {
      idle: /* @__PURE__ */ jsx(Spinner, { className: "ml-2 size-5 mb-1" }),
      valid: /* @__PURE__ */ jsx(CheckIcon, { className: "text-success ml-2" }),
      invalid: /* @__PURE__ */ jsx(XIcon, { className: "text-destructive ml-2 size-6" })
    };
    return icons[config.data.session.status];
  };
  if (!config.data || !config.serverData) {
    return /* @__PURE__ */ jsx(TypographyH1, { children: "No bot configurations found." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 w-full", children: [
    /* @__PURE__ */ jsxs(CardRoot, { className: "max-w-md w-full", children: [
      /* @__PURE__ */ jsxs(CardHeader, { className: "flex justify-between items-center gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Switch,
            {
              color: "success",
              checked: Object.values(config.data.features).some(
                (feature) => feature.enabled
              ),
              onCheckedChange: handleToggleAll
            }
          ),
          /* @__PURE__ */ jsx(CardTitle, { children: "Bot" })
        ] }),
        /* @__PURE__ */ jsx(
          ToastButton,
          {
            variant: "primary",
            onClick: async (e, toastManager) => {
              try {
                await restartMutation.mutateAsync();
                toastManager.success({
                  description: "The bot has been restarted",
                  timeout: 3e3
                });
              } catch {
                toastManager.error({
                  description: "Failed to restart the bot",
                  timeout: 3e3
                });
              }
            },
            loading: restartMutation.isPending,
            children: "Restart"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(CardContent, { className: "flex gap-4 items-end", children: [
        /* @__PURE__ */ jsxs(FieldRoot, { className: "flex-1", children: [
          /* @__PURE__ */ jsxs(FieldLabel, { className: "flex items-center", children: [
            "Session ID ",
            renderSessionStatus()
          ] }),
          /* @__PURE__ */ jsx(
            FieldControl,
            {
              defaultValue: config.data.session.id,
              onChange: (e) => updateConfig({ session: { id: e.currentTarget.value } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(FieldRoot, { className: "flex-1", children: [
          /* @__PURE__ */ jsx(FieldLabel, { children: "Game Version" }),
          /* @__PURE__ */ jsx(
            FieldControl,
            {
              defaultValue: config.data.gameVersion,
              onChange: (e) => updateConfig({ gameVersion: e.currentTarget.value })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 w-full md:w-10/12 gap-4", children: [
      /* @__PURE__ */ jsxs(
        BotFeatureCard,
        {
          label: "Campaign Missions",
          enabled: config.data?.features.campaignMission.enabled,
          onEnabledChange: toggleFeature("campaignMission"),
          children: [
            /* @__PURE__ */ jsxs(FieldRoot, { children: [
              /* @__PURE__ */ jsx(FieldLabel, { children: "Battle Cooldown (seconds)" }),
              /* @__PURE__ */ jsx(
                FieldControl,
                {
                  render: /* @__PURE__ */ jsx(
                    NumberFieldRoot,
                    {
                      min: 1,
                      defaultValue: config.data.features.campaignMission.battleCooldownSeconds,
                      onValueChange: handleNumberChange((value) => ({
                        features: {
                          campaignMission: { battleCooldownSeconds: value }
                        }
                      })),
                      children: /* @__PURE__ */ jsx(NumberFieldInput, {})
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx(MissionList, {})
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        BotFeatureCard,
        {
          label: "Alchemy Experiments",
          enabled: config.data?.features.alchemyExperiment.enabled,
          onEnabledChange: toggleFeature("alchemyExperiment"),
          className: "flex-col",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end gap-2", children: [
              /* @__PURE__ */ jsxs(FieldRoot, { children: [
                /* @__PURE__ */ jsx(FieldLabel, { children: "Tree Level" }),
                /* @__PURE__ */ jsx(
                  FieldControl,
                  {
                    render: /* @__PURE__ */ jsx(
                      NumberFieldRoot,
                      {
                        min: 1,
                        defaultValue: config.data.features.alchemyExperiment.treeLevel,
                        onValueChange: handleNumberChange((treeLevel) => ({
                          features: { alchemyExperiment: { treeLevel } }
                        })),
                        children: /* @__PURE__ */ jsx(NumberFieldInput, {})
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(FieldRoot, { children: [
                /* @__PURE__ */ jsx(FieldLabel, { children: "Duration (67 minutes)" }),
                /* @__PURE__ */ jsx(
                  FieldControl,
                  {
                    render: /* @__PURE__ */ jsx(
                      NumberFieldRoot,
                      {
                        min: 1,
                        defaultValue: config.data.features.alchemyExperiment.durationMinutes,
                        onValueChange: handleNumberChange((durationMinutes) => ({
                          features: { alchemyExperiment: { durationMinutes } }
                        })),
                        children: /* @__PURE__ */ jsx(NumberFieldInput, {})
                      }
                    )
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(FieldRoot, { orientation: "horizontal", children: /* @__PURE__ */ jsxs(FieldLabel, { children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    checked: config.data.features.alchemyExperiment.blood,
                    onCheckedChange: (blood) => updateConfig({
                      features: { alchemyExperiment: { blood } }
                    })
                  }
                ),
                "Blood"
              ] }) }),
              /* @__PURE__ */ jsx(FieldRoot, { orientation: "horizontal", children: /* @__PURE__ */ jsxs(FieldLabel, { children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    checked: config.data.features.alchemyExperiment.dust,
                    onCheckedChange: (dust) => updateConfig({
                      features: { alchemyExperiment: { dust } }
                    })
                  }
                ),
                "Dust"
              ] }) }),
              /* @__PURE__ */ jsx(FieldRoot, { orientation: "horizontal", children: /* @__PURE__ */ jsxs(FieldLabel, { children: [
                /* @__PURE__ */ jsx(
                  Switch,
                  {
                    checked: config.data.features.alchemyExperiment.exoticCoins,
                    onCheckedChange: (exoticCoins) => updateConfig({
                      features: { alchemyExperiment: { exoticCoins } }
                    })
                  }
                ),
                "Exotic Coins"
              ] }) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Firestone Research",
          enabled: config.data?.features.firestoneResearch.enabled,
          onEnabledChange: toggleFeature("firestoneResearch"),
          children: /* @__PURE__ */ jsxs(FieldRoot, { children: [
            /* @__PURE__ */ jsx(FieldLabel, { children: "Tree Level" }),
            /* @__PURE__ */ jsx(
              FieldControl,
              {
                render: /* @__PURE__ */ jsx(
                  NumberFieldRoot,
                  {
                    min: 1,
                    defaultValue: config.data.features.firestoneResearch.treeLevel,
                    onValueChange: handleNumberChange((treeLevel) => ({
                      features: { firestoneResearch: { treeLevel } }
                    })),
                    children: /* @__PURE__ */ jsx(NumberFieldInput, {})
                  }
                )
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        BotFeatureCard,
        {
          label: "Guardian Training",
          enabled: config.data?.features.guardianTraining.enabled,
          onEnabledChange: toggleFeature("guardianTraining"),
          children: [
            /* @__PURE__ */ jsxs(FieldRoot, { children: [
              /* @__PURE__ */ jsx(FieldLabel, { nativeLabel: false, render: /* @__PURE__ */ jsx("div", {}), children: "Guardian" }),
              /* @__PURE__ */ jsxs(
                SelectRoot,
                {
                  items: guardians,
                  value: config.data.features.guardianTraining.guardian,
                  onValueChange: (guardian) => {
                    if (!guardian) return;
                    updateConfig({
                      features: { guardianTraining: { guardian } }
                    });
                  },
                  children: [
                    /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsx(SelectContent, { children: Object.entries(guardians).map(([value, name]) => /* @__PURE__ */ jsx(SelectItem, { value, children: name }, value)) })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(FieldRoot, { children: [
              /* @__PURE__ */ jsx(FieldLabel, { children: "Cooldown (hours)" }),
              /* @__PURE__ */ jsx(
                FieldControl,
                {
                  render: /* @__PURE__ */ jsx(
                    NumberFieldRoot,
                    {
                      min: 1,
                      defaultValue: config.data.features.guardianTraining.cooldownSeconds / 60 / 60,
                      onValueChange: handleNumberChange((value) => ({
                        features: {
                          guardianTraining: { cooldownSeconds: value * 60 * 60 }
                        }
                      })),
                      children: /* @__PURE__ */ jsx(NumberFieldInput, {})
                    }
                  )
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Engineer Tools",
          enabled: config.data?.features.engineerTools.enabled,
          onEnabledChange: toggleFeature("engineerTools")
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Campaign Loot",
          enabled: config.data?.features.campaignLoot.enabled,
          onEnabledChange: toggleFeature("campaignLoot")
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Guild Expeditions",
          enabled: config.data?.features.guildExpedition.enabled,
          onEnabledChange: toggleFeature("guildExpedition")
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Oracle Rituals",
          enabled: config.data?.features.oracleRitual.enabled,
          onEnabledChange: toggleFeature("oracleRitual")
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Pickaxes",
          enabled: config.data?.features.pickaxesClaiming.enabled,
          onEnabledChange: toggleFeature("pickaxesClaiming")
        }
      ),
      /* @__PURE__ */ jsx(
        BotFeatureCard,
        {
          label: "Map Missions",
          enabled: config.data?.features.mapMission.enabled,
          onEnabledChange: toggleFeature("mapMission")
        }
      )
    ] })
  ] });
}
const BotFeatureCard = ({
  label,
  enabled,
  onEnabledChange,
  children,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(CardRoot, { className: "w-full", children: [
    /* @__PURE__ */ jsxs(CardHeader, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(
        Switch,
        {
          checked: enabled,
          onCheckedChange: onEnabledChange,
          color: "success"
        }
      ),
      /* @__PURE__ */ jsx(CardTitle, { children: label })
    ] }),
    children && /* @__PURE__ */ jsx(
      CardContent,
      {
        ...props,
        className: cn("flex flex-wrap gap-4", className),
        children
      }
    )
  ] });
};
const Loading = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 w-full", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-[170px] max-w-md w-full" }),
    /* @__PURE__ */ jsx(Separator, {}),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 w-full md:w-10/12 gap-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[188px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[188px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[152px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[152px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[68px]" })
    ] })
  ] });
};
function BotPage() {
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-2", children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Loading, {}), children: /* @__PURE__ */ jsx(BotConfig, {}) }) });
}
export {
  BotPage as component
};
