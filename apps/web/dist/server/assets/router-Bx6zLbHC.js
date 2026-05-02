import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider, QueryCache, defaultShouldDehydrateQuery } from "@tanstack/react-query";
import SuperJSON from "superjson";
import { Link, createRootRouteWithContext, HeadContent, Outlet, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { createTRPCContext as createTRPCContext$1, createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { Loader2, Loader2Icon, ChevronUpIcon, ChevronDownIcon, CheckIcon, XIcon } from "lucide-react";
import { createContext, useContext } from "react";
import { clsx } from "clsx";
import { Button as Button$1, Dialog, Input as Input$1, Field, NumberField, useRender, mergeProps, Progress, ScrollArea, Select, Separator as Separator$1, Switch as Switch$1, Tooltip, Toast } from "@base-ui/react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import { Tabs } from "@base-ui/react/tabs";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { z, ZodError } from "zod";
import { flatten } from "flat";
import { execa } from "execa";
import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { MongoClient, ObjectId } from "mongodb";
import Papr, { schema, types } from "papr";
import "neverthrow";
import "munkres-js";
import { initTRPC, TRPCError } from "@trpc/server";
function Loader() {
  return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center pt-8", children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) });
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const spinnerStyles = tv({
  base: "size-5 animate-spin",
  variants: {
    color: {
      default: "text-default",
      neutral: "text-neutral",
      primary: "text-primary",
      secondary: "text-secondary",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive",
      info: "text-info"
    }
  }
});
function Spinner({
  className,
  color = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Loader2Icon,
    {
      role: "status",
      "aria-label": "Loading",
      className: spinnerStyles({ color, className }),
      ...props
    }
  );
}
const buttonStyles = tv({
  base: `inline-flex items-center justify-center gap-1 shrink-0
    whitespace-nowrap text-sm font-medium
    rounded-sm cursor-pointer
    transition-all
    relative
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,
  variants: {
    appearance: {
      solid: "shadow-sm",
      outline: `border-2 shadow-sm`,
      ghost: "",
      link: "underline-offset-4 hover:underline"
    },
    color: {
      default: "focus-visible:outline-default/80!",
      neutral: "focus-visible:outline-neutral/80!",
      primary: "focus-visible:outline-primary/80!",
      secondary: "focus-visible:outline-secondary!",
      success: "focus-visible:outline-success!",
      warning: "focus-visible:outline-warning!",
      destructive: "focus-visible:outline-destructive!",
      info: "focus-visible:outline-info!"
    },
    size: {
      default: `h-9 px-4 py-2
        has-[>svg:not([data-slot=button-spinner])]:px-3`,
      sm: `h-8 rounded-md gap-1.5 px-3
        has-[>svg:not([data-slot=button-spinner])]:px-2.5`,
      lg: `h-10 rounded-md px-6
        has-[>svg:not([data-slot=button-spinner])]:px-4`,
      icon: "size-9",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    },
    blur: {
      true: "backdrop-blur-sm"
    }
  },
  defaultVariants: {
    appearance: "solid",
    color: "default",
    size: "default"
  },
  compoundVariants: [
    //#region appearance=solid
    {
      appearance: "solid",
      color: "default",
      className: `bg-default text-default-foreground shadow-default/10
        hover:bg-default/90`
    },
    {
      appearance: "solid",
      color: "neutral",
      className: `bg-neutral text-neutral-foreground shadow-neutral/10
        hover:bg-neutral-light`
    },
    {
      appearance: "solid",
      color: "primary",
      className: `bg-primary text-primary-foreground shadow-primary/10
        hover:bg-primary-light`
    },
    {
      appearance: "solid",
      color: "secondary",
      className: `bg-secondary text-secondary-foreground shadow-secondary/10
        hover:bg-secondary-light`
    },
    {
      appearance: "solid",
      color: "success",
      className: `bg-success text-success-foreground shadow-success/10
        hover:bg-success-light`
    },
    {
      appearance: "solid",
      color: "warning",
      className: `bg-warning text-warning-foreground shadow-warning/10
        hover:bg-warning-light`
    },
    {
      appearance: "solid",
      color: "destructive",
      className: `bg-destructive text-white shadow-destructive/10
        hover:bg-destructive-light`
    },
    {
      appearance: "solid",
      color: "info",
      className: `bg-info text-info-foreground shadow-info/10
        hover:bg-info-light`
    },
    //#endregion
    //#region appearance=outline
    {
      appearance: "outline",
      color: "default",
      className: `text-default border-default! shadow-default/10
        hover:bg-default/20 hover:border-default/90!`
    },
    {
      appearance: "outline",
      color: "neutral",
      className: `text-neutral-light border-neutral-light! shadow-neutral-light/10
        hover:bg-neutral-light/20 hover:border-[oklch(from_var(--neutral-light)_0.6_0_0)]!`
    },
    {
      appearance: "outline",
      color: "primary",
      className: `text-primary border-primary! shadow-primary/10
        hover:bg-primary/20 hover:border-primary-light!`
    },
    {
      appearance: "outline",
      color: "secondary",
      className: `text-secondary border-secondary! shadow-secondary/10
        hover:bg-secondary/20 hover:border-secondary-light!`
    },
    {
      appearance: "outline",
      color: "success",
      className: `text-success border-success! shadow-success/10
        hover:bg-success/20 hover:border-success-light!`
    },
    {
      appearance: "outline",
      color: "warning",
      className: `text-warning border-warning! shadow-warning/10
        hover:bg-warning/20 hover:border-warning-light!`
    },
    {
      appearance: "outline",
      color: "destructive",
      className: `text-destructive border-destructive! shadow-destructive/10
        hover:bg-destructive/20 hover:border-destructive-light!`
    },
    {
      appearance: "outline",
      color: "info",
      className: `text-info border-info! shadow-info/10
        hover:bg-info/20 hover:border-info-light!`
    },
    //#endregion
    //#region appearance=ghost
    {
      appearance: "ghost",
      color: "default",
      className: `text-default
        hover:bg-default/20`
    },
    {
      appearance: "ghost",
      color: "neutral",
      className: `text-neutral-light
        hover:bg-neutral-light/20`
    },
    {
      appearance: "ghost",
      color: "primary",
      className: `text-primary
        hover:bg-primary/20`
    },
    {
      appearance: "ghost",
      color: "secondary",
      className: `text-secondary hover:bg-secondary/20`
    },
    {
      appearance: "ghost",
      color: "success",
      className: `text-success hover:bg-success/20`
    },
    {
      appearance: "ghost",
      color: "warning",
      className: `text-warning hover:bg-warning/20`
    },
    {
      appearance: "ghost",
      color: "destructive",
      className: `text-destructive
        hover:bg-destructive/20`
    },
    {
      appearance: "ghost",
      color: "info",
      className: `text-info hover:bg-info/20`
    },
    //#endregion
    //#region appearance=link
    {
      appearance: "link",
      color: "default",
      className: "text-default"
    },
    {
      appearance: "link",
      color: "neutral",
      className: "text-neutral-light"
    },
    {
      appearance: "link",
      color: "primary",
      className: "text-primary"
    },
    {
      appearance: "link",
      color: "secondary",
      className: "text-secondary"
    },
    {
      appearance: "link",
      color: "success",
      className: "text-success"
    },
    {
      appearance: "link",
      color: "warning",
      className: "text-warning"
    },
    {
      appearance: "link",
      color: "destructive",
      className: "text-destructive"
    },
    {
      appearance: "link",
      color: "info",
      className: "text-info"
    }
    //#endregion
  ]
});
const variants = {
  default: {
    appearance: "solid",
    color: "default"
  },
  primary: {
    appearance: "solid",
    color: "primary"
  },
  secondary: {
    appearance: "outline",
    color: "primary"
  },
  muted: {
    appearance: "outline",
    color: "neutral"
  }
};
function Button({
  className,
  variant = "default",
  appearance,
  color,
  size = "default",
  blur,
  loading,
  disabled,
  children,
  slotProps,
  ...props
}) {
  const variantProps = {
    appearance: appearance ?? variants[variant].appearance,
    color: color ?? variants[variant].color
  };
  return /* @__PURE__ */ jsxs(
    Button$1,
    {
      "data-slot": "button",
      "data-appearance": variantProps.appearance,
      "data-size": size,
      "data-color": variantProps.color,
      "data-blur": blur ? "true" : void 0,
      "data-loading": loading ? "true" : void 0,
      className: buttonStyles({
        ...variantProps,
        size,
        blur,
        className: String(className ?? "")
      }),
      disabled: disabled || loading,
      ...props,
      children: [
        children,
        loading && /* @__PURE__ */ jsx(
          Spinner,
          {
            "data-slot": "button-spinner",
            color: color === "default" ? "neutral" : "default",
            ...slotProps?.spinner,
            className: cn(
              `absolute top-0 right-0 size-4.5 translate-x-1.5 -translate-y-1.5
            rounded-full`,
              slotProps?.spinner?.className
            )
          }
        )
      ]
    }
  );
}
const styles$e = tv({
  base: `flex flex-col gap-6 rounded-lg py-6
    shadow-md border`,
  variants: {
    color: {
      default: "bg-background",
      primary: "bg-primary/10 border-primary/30!",
      secondary: "bg-secondary/10 border-secondary/30!",
      success: "bg-success/10 border-success/30!",
      warning: "bg-warning/10 border-warning/30!",
      destructive: "bg-destructive/10 border-destructive/30!",
      info: "bg-info/10 border-info/30!"
    },
    blur: {
      true: "backdrop-blur-xs"
    }
  }
});
function CardRoot({
  className,
  color = "default",
  blur,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-root",
      "data-color": color,
      "data-blur": blur ? "true" : void 0,
      className: styles$e({ className, color, blur }),
      ...props
    }
  );
}
tv({
  base: `transition-all overflow-hidden
    [&[hidden]:not([hidden='until-found'])]:hidden`,
  variants: {
    vertical: {
      true: `h-(--collapsible-panel-height)
        data-ending-style:h-0 data-starting-style:h-0`
    },
    horizontal: {
      true: `w-(--collapsible-panel-height)
        data-ending-style:w-0 data-starting-style:w-0`
    }
  }
});
tv({
  base: "px-4 py-3",
  variants: {
    borderless: {
      false: "border-t"
    }
  }
});
const DataTableContext = createContext(void 0);
const DataTableProvider = DataTableContext.Provider;
const useDataTableContext = () => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("You must use DataTable inside a DataTable.Root component");
  }
  return context;
};
tv({
  base: "font-medium [&>tr]:last:border-b-0",
  variants: {
    borderless: {
      false: "border-t"
    }
  }
});
const headerStyles = tv({
  base: "",
  variants: {
    sticky: {
      true: "bg-background sticky top-0 z-10 shadow-md"
    },
    borderless: {
      true: ""
    }
  },
  compoundVariants: [
    {
      sticky: true,
      borderless: false,
      className: `after:absolute after:bottom-0 after:h-px after:w-full
        after:border-b after:border-border`
    }
  ]
});
function TableHeader({
  className,
  sticky,
  borderless,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: headerStyles({ sticky, borderless, className }),
      ...props
    }
  );
}
const rowStyles = tv({
  base: `data-[state=selected]:bg-accent
    transition-all`,
  variants: {
    hoverEffect: {
      none: "",
      highlight: "hover:bg-accent/50"
    },
    borderless: {
      false: "border-b"
    }
  }
});
function TableRow({
  className,
  borderless,
  hoverEffect = "none",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: rowStyles({ hoverEffect, borderless, className }),
      ...props
    }
  );
}
tv({
  base: `peer border-input bg-input size-5
    shrink-0 cursor-pointer rounded-sm border shadow-xs transition-shadow
    data-disabled:pointer-events-none data-disabled:opacity-50
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,
  variants: {
    color: {
      default: `[&[data-checked],&[data-indeterminate]]:text-default-foreground
        [&[data-checked],&[data-indeterminate]]:border-default
        [&[data-checked],&[data-indeterminate]]:bg-default
        focus-visible:outline-default/80!`,
      neutral: `[&[data-checked],&[data-indeterminate]]:text-neutral-foreground
        [&[data-checked],&[data-indeterminate]]:border-neutral
        [&[data-checked],&[data-indeterminate]]:bg-neutral
        focus-visible:outline-neutral/80!`,
      primary: `[&[data-checked],&[data-indeterminate]]:text-primary-foreground
        [&[data-checked],&[data-indeterminate]]:border-primary
        [&[data-checked],&[data-indeterminate]]:bg-primary
        focus-visible:outline-primary/80!`,
      secondary: `[&[data-checked],&[data-indeterminate]]:text-secondary-foreground
        [&[data-checked],&[data-indeterminate]]:border-secondary
        [&[data-checked],&[data-indeterminate]]:bg-secondary
        focus-visible:outline-secondary/80!`,
      success: `[&[data-checked],&[data-indeterminate]]:text-success-foreground
        [&[data-checked],&[data-indeterminate]]:border-success
        [&[data-checked],&[data-indeterminate]]:bg-success
        focus-visible:outline-success/80!`,
      warning: `[&[data-checked],&[data-indeterminate]]:text-warning-foreground
        [&[data-checked],&[data-indeterminate]]:border-warning
        [&[data-checked],&[data-indeterminate]]:bg-warning
        focus-visible:outline-warning/80!`,
      destructive: `[&[data-checked],&[data-indeterminate]]:text-destructive-foreground
        [&[data-checked],&[data-indeterminate]]:border-destructive
        [&[data-checked],&[data-indeterminate]]:bg-destructive
        focus-visible:outline-destructive/80!`,
      info: `[&[data-checked],&[data-indeterminate]]:text-info-foreground
        [&[data-checked],&[data-indeterminate]]:border-info
        [&[data-checked],&[data-indeterminate]]:bg-info
        focus-visible:outline-info/80!`
    }
  }
});
tv({
  base: "container mx-auto min-h-screen px-6 py-4",
  variants: {
    variant: {
      solid: "bg-background-dark",
      transparent: "bg-background/85 shadow-x-xl! shadow-primary/10"
    },
    blur: {
      true: "backdrop-blur-xs"
    }
  },
  defaultVariants: {
    variant: "solid"
  }
});
tv({
  base: `fixed inset-0 isolate bg-black/50 duration-100
    data-starting-style:opacity-0
    data-ending-style:opacity-0`,
  variants: {
    blur: {
      true: "supports-backdrop-filter:backdrop-blur-xs"
    }
  }
});
tv({
  base: `
    data-starting-style:opacity-0 data-starting-style:scale-95
    data-ending-style:opacity-0 data-ending-style:scale-95
    ring-foreground/10 group/alert-dialog-content fixed
    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
    gap-6 rounded-md p-6 ring-1 duration-150 outline-none
    container w-auto shadow-lg flex flex-col max-h-11/12
    min-w-[100px] md:min-w-[min(100%,400px)] transition-all
    scale-[calc(1-0.1*var(--nested-dialogs))] translate-y-[calc(-50%+1.25rem*var(--nested-dialogs))]
    bg-background border`,
  variants: {},
  defaultVariants: {}
});
Dialog.createHandle;
Dialog.Handle;
const styles$d = tv({
  base: `rounded-md flex items-center gap-2 h-9 w-full min-w-0 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    file:text-foreground file:inline-flex file:h-7 file:border-0
    file:bg-transparent file:text-sm file:font-medium
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,
  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light!`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`
    },
    blur: {
      true: "backdrop-blur-xs"
    }
  }
});
const Input = ({
  className,
  color = "default",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Input$1,
    {
      "data-slot": "input",
      className: styles$d({ color, className }),
      ...props
    }
  );
};
const styles$c = tv({
  base: "flex gap-1",
  variants: {
    orientation: {
      vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
      horizontal: `flex-row items-center
        *:data-[slot=field-label]:flex-auto
        has-[>[data-slot=field-control]]:items-start
        has-[>[data-slot=field-control]]:[&>[role=checkbox],[role=radio]]:mt-px`,
      responsive: `flex-col *:w-full [&>.sr-only]:w-auto
        @md/field-group:flex-row
        @md/field-group:items-center
        @md/field-group:*:w-auto
        @md/field-group:*:data-[slot=field-label]:flex-auto
        @md/field-group:has-[>[data-slot=field-control]]:items-start
        @md/field-group:has-[>[data-slot=field-control]]:[&>[role=checkbox],[role=radio]]:mt-px`
    }
  },
  defaultVariants: {
    orientation: "horizontal"
  }
});
const FieldRoot = ({
  className,
  orientation = "vertical",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Field.Root,
    {
      "data-slot": "field-root",
      "data-orientation": orientation,
      ...props,
      className: styles$c({ orientation, className })
    }
  );
};
Field.Validity;
const styles$b = tv({
  base: `rounded-md flex items-center gap-2 h-9 w-full min-w-0 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    relative z-1`,
  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light!`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`
    }
  }
});
const NumberFieldInput = ({
  className,
  color = "default",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    NumberField.Input,
    {
      "data-slot": "number-field-input",
      ...props,
      className: styles$b({ color, className })
    }
  );
};
const inputGroupAddonVariants = tv({
  base: `text-muted-foreground h-auto gap-2 py-1.5
    text-sm font-medium
    group-data-[disabled=true]/input-group:opacity-50
    [&>kbd]:rounded-[calc(var(--radius)-5px)]
    [&>svg:not([class*='size-'])]:size-4
    flex cursor-text items-center justify-center
    select-none`,
  variants: {
    align: {
      "inline-start": `pl-2 has-[>button]:ml-[-0.3rem]
        has-[>kbd]:ml-[-0.15rem] order-first`,
      "inline-end": `pr-2 has-[>button]:mr-[-0.3rem]
         has-[>kbd]:mr-[-0.15rem] order-last`,
      "block-start": `px-2.5 pt-2
        group-has-[>input]/input-group:pt-2
        [.border-b]:pb-2 order-first w-full justify-start`,
      "block-end": `px-2.5 pb-2
        group-has-[>input]/input-group:pb-2
        [.border-t]:pt-2 order-last w-full justify-start`
    }
  },
  defaultVariants: {
    align: "inline-start"
  }
});
function InputGroupAddon({
  className,
  align = "inline-start",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps(
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": align,
        className: cn(inputGroupAddonVariants({ align }), className),
        onClick: (e) => {
          if (e.target.closest("button")) {
            return;
          }
          e.currentTarget.parentElement?.querySelector("input")?.focus();
        }
      },
      props
    )
  });
}
tv({
  base: "gap-2 text-sm shadow-none flex items-center",
  variants: {
    size: {
      xs: `h-6 gap-1
        rounded-[calc(var(--radius)-3px)] px-1.5
        [&>svg:not([class*='size-'])]:size-3.5`,
      sm: "",
      "icon-xs": `size-6
        rounded-[calc(var(--radius)-3px)] p-0
        has-[>svg]:p-0`,
      "icon-sm": "size-8 p-0 has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
const styles$a = tv({
  base: `
    has-[[data-slot=input-group-control]:focus-visible]:outline-solid
    has-[[data-slot=input-group-control]:focus-visible]:outline-2
    has-[[data-slot=input-group-control]:focus-visible]:outline-offset-2
    has-[[data-slot][aria-invalid=true]]:ring-destructive/35
    has-[[data-slot][aria-invalid=true]]:ring-3
    group/input-group
    relative flex h-9 w-full min-w-0 items-center rounded-lg
    transition-colors outline-none has-disabled:opacity-50
    has-[>[data-align=block-end]]:h-auto
    has-[>[data-align=block-end]]:flex-col
    has-[>[data-align=block-start]]:h-auto
    has-[>[data-align=block-start]]:flex-col
    has-[>textarea]:h-auto
    has-[>[data-align=block-end]]:[&>input]:pt-3
    has-[>[data-align=block-start]]:[&>input]:pb-3
    has-[>[data-align=inline-end]]:[&>input]:pr-1.5
    has-[>[data-align=inline-start]]:[&>input]:pl-1.5
    [[data-slot=combobox-content]_&]:focus-within:border-inherit
    [[data-slot=combobox-content]_&]:focus-within:ring-0`,
  variants: {
    color: {
      default: `bg-background-light
        has-[[data-slot=input-group-control]:focus-visible]:outline-background-light!`,
      neutral: `bg-neutral
        data-[slot=input-group-control]:placeholder:text-neutral-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-neutral!`,
      primary: `bg-primary
        **:text-primary-foreground
        **:placeholder:text-primary-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-primary!`,
      secondary: `bg-secondary
        **:text-secondary-foreground
        **:placeholder:text-secondary-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-secondary!`,
      success: `bg-success
        **:text-success-foreground
        **:placeholder:text-success-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-success!`,
      warning: `bg-warning
        **:text-warning-foreground
        **:placeholder:text-warning-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-warning!`,
      destructive: `bg-destructive
        **:text-destructive-foreground
        **:placeholder:text-destructive-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-destructive!`,
      info: `bg-info
        **:text-info-foreground
        **:placeholder:text-info-foreground
        has-[[data-slot=input-group-control]:focus-visible]:outline-info!`
    }
  }
});
function InputGroupRoot({
  className,
  color = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "input-group-root",
      role: "group",
      className: styles$a({ color, className }),
      ...props
    }
  );
}
tv({
  base: `rounded-md flex items-center gap-2 w-full px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-2
    placeholder:text-muted-foreground
    selection:bg-default selection:text-default-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    field-sizing-content min-h-16`,
  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light!`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`
    }
  }
});
const styles$9 = tv({
  base: "block bg-gray-500 transition-[width]",
  variants: {
    color: {
      inherit: "bg-(--color)",
      default: `bg-default`,
      neutral: `bg-neutral`,
      primary: `bg-primary`,
      secondary: `bg-secondary`,
      success: `bg-success`,
      warning: `bg-warning`,
      destructive: `bg-destructive`,
      info: `bg-info`
    }
  }
});
const ProgressIndicator = ({
  className,
  color = "inherit",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Progress.Indicator,
    {
      "data-slot": "progress-indicator",
      className: styles$9({ color, className }),
      ...props
    }
  );
};
const styles$8 = tv({
  base: "col-[1/3] h-2 overflow-hidden rounded-sm bg-(--color)/20 inset-shadow-sm",
  variants: {
    color: {
      default: `[--color:var(--default)]`,
      neutral: `[--color:var(--neutral)]`,
      primary: `[--color:var(--primary)]`,
      secondary: `[--color:var(--secondary)]`,
      success: `[--color:var(--success)]`,
      warning: `[--color:var(--warning)]`,
      destructive: `[--color:var(--destructive)]`,
      info: `[--color:var(--info)]`
    }
  }
});
const ProgressTrack = ({
  className,
  color = "default",
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    Progress.Track,
    {
      "data-slot": "progress-track",
      className: styles$8({ color, className }),
      ...props
    }
  );
};
tv({
  base: `overscroll-contain`,
  variants: {
    vertical: {
      true: ""
    },
    horizontal: {
      true: ""
    }
  }
});
const ScrollAreaContent = (props) => {
  return /* @__PURE__ */ jsx(ScrollArea.Content, { "data-slot": "scroll-area-content", ...props });
};
const styles$7 = tv({
  base: `pointer-events-none relative m-2 flex
    opacity-0 transition-[opacity,width,height] rounded-md
    data-hovering:pointer-events-auto
    data-hovering:opacity-100
    data-scrolling:pointer-events-auto
    data-scrolling:opacity-100
    before:absolute before:content-['']`,
  variants: {
    orientation: {
      vertical: `w-1 hover:w-2 before:top-0 before:right-0
        before:bottom-0 before:h-full before:w-5`,
      horizontal: `h-1 hover:h-2 before:right-0 before:bottom-0
        before:left-0 before:h-5 before:w-full`
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
});
const ScrollAreaScrollbar = ({
  orientation,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    ScrollArea.Scrollbar,
    {
      "data-slot": "scroll-area-scrollbar",
      ...props,
      orientation,
      className: styles$7({ orientation, className })
    }
  );
};
const shadowTop = cn(`before:pointer-events-none before:absolute before:top-0
  before:left-0 before:block
  before:h-[min(40px,var(--scroll-area-overflow-y-start))]
  before:w-full
  before:bg-[linear-gradient(to_bottom,hsl(0_0_0/.35),transparent)]
  before:transition-[height] before:content-['']
  before:[--scroll-area-overflow-y-start:inherit]`);
const shadowBottom = cn(`after:pointer-events-none after:absolute after:bottom-0
  after:left-0 after:block
  after:h-[min(40px,var(--scroll-area-overflow-y-end))]
  after:w-full
  after:bg-[linear-gradient(to_top,hsl(0_0_0/.35),transparent)]
  after:transition-[height] after:content-['']
  after:[--scroll-area-overflow-y-end:inherit]`);
const shadowLeft = cn(`pointer-events-none absolute top-0 left-0 block h-full
  w-[min(40px,var(--scroll-area-overflow-x-start))]
  bg-[linear-gradient(to_right,hsl(0_0_0/.35),transparent)]
  transition-[height] content-['']
  [--scroll-area-overflow-x-start:inherit]`);
const shadowRight = cn(`pointer-events-none absolute top-0 right-0 block h-full
  w-[min(40px,var(--scroll-area-overflow-x-end))]
  bg-[linear-gradient(to_left,hsl(0_0_0/.35),transparent)]
  transition-[height] content-['']
  [--scroll-area-overflow-x-end:inherit]`);
const styles$6 = tv({
  base: `min-h-0 flex-1 overscroll-contain pr-4`,
  slots: {
    shadowLeft: "",
    shadowRight: ""
  },
  variants: {
    shadow: {
      true: {
        base: [shadowTop, shadowBottom],
        shadowLeft,
        shadowRight
      },
      y: {
        base: [shadowTop, shadowBottom]
      },
      top: {
        base: shadowTop
      },
      bottom: {
        base: shadowBottom
      },
      x: {
        shadowLeft,
        shadowRight
      },
      left: { shadowLeft },
      right: { shadowRight }
    }
  }
});
const ScrollAreaViewport = ({
  shadow,
  className,
  children,
  ...props
}) => {
  const { base, shadowLeft: shadowLeft2, shadowRight: shadowRight2 } = styles$6({ shadow });
  const shadowLeftClassName = shadowLeft2();
  const shadowRightClassName = shadowRight2();
  return /* @__PURE__ */ jsxs(
    ScrollArea.Viewport,
    {
      "data-slot": "scroll-area-viewport",
      ...props,
      className: base({ className }),
      children: [
        shadowLeftClassName && /* @__PURE__ */ jsx("div", { className: shadowLeftClassName }),
        shadowRightClassName && /* @__PURE__ */ jsx("div", { className: shadowRightClassName }),
        children
      ]
    }
  );
};
function SelectScrollUpArrow({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select.ScrollUpArrow,
    {
      "data-slot": "select-scroll-up-arrow",
      className: cn(
        `bg-popover top-0 z-10 flex w-full cursor-default items-center
        justify-center py-1 [&_svg:not([class*='size-'])]:size-4`,
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronUpIcon, {})
    }
  );
}
function SelectScrollDownArrow({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Select.ScrollDownArrow,
    {
      "data-slot": "select-scroll-down-arrow",
      className: cn(
        `bg-popover bottom-0 z-10 flex w-full cursor-default items-center
        justify-center py-1 [&_svg:not([class*='size-'])]:size-4`,
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4" })
    }
  );
}
const styles$5 = tv({
  base: `data-open:animate-in
    data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0
    data-closed:zoom-out-95 data-open:zoom-in-95
    data-[side=bottom]:slide-in-from-top-2
    data-[side=left]:slide-in-from-right-2
    data-[side=right]:slide-in-from-left-2
    data-[side=top]:slide-in-from-bottom-2 relative
    isolate z-50 max-h-(--available-height) min-w-[max(var(--anchor-width),calc(var(--spacing)*36))]
    origin-(--transform-origin) overflow-x-hidden overflow-y-auto
    rounded-md shadow-md duration-100
    bg-background-light
    focus-visible:outline-primary focus-visible:outline-[3px] focus-visible:outline-offset-2`,
  variants: {
    blur: {
      true: "backdrop-blur-xs"
    }
  }
});
function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = false,
  blur,
  ...props
}) {
  return /* @__PURE__ */ jsx(Select.Portal, { children: /* @__PURE__ */ jsxs(
    Select.Positioner,
    {
      side,
      sideOffset,
      align,
      alignOffset,
      alignItemWithTrigger,
      className: "isolate z-50",
      children: [
        /* @__PURE__ */ jsx(SelectScrollUpArrow, {}),
        /* @__PURE__ */ jsx(
          Select.Popup,
          {
            "data-slot": "select-content",
            className: styles$5({ blur, className }),
            ...props,
            children: /* @__PURE__ */ jsx(Select.List, { children })
          }
        ),
        /* @__PURE__ */ jsx(SelectScrollDownArrow, {})
      ]
    }
  ) });
}
const styles$4 = tv({
  base: `
    relative
    flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8
    pl-2 text-sm outline-hidden select-none
    data-disabled:pointer-events-none data-disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex
    *:[span]:last:items-center *:[span]:last:gap-2`,
  slots: {
    indicator: `text-primary pointer-events-none absolute flex
      size-4 items-center justify-center`,
    wrapper: "flex items-center gap-2"
  },
  variants: {
    variant: {
      default: "focus:bg-accent focus:text-accent-foreground",
      destructive: "text-destructive focus:bg-destructive-dark focus:text-destructive-foreground focus:[&_svg]:text-foreground"
    },
    indicatorPosition: {
      start: {
        wrapper: "pl-6",
        indicator: "left-2"
      },
      end: {
        indicator: "right-2"
      }
    }
  },
  defaultVariants: {
    variant: "default",
    indicatorPosition: "end"
  }
});
function SelectItem({
  className,
  variant,
  children,
  icon,
  indicatorPosition = "end",
  ...props
}) {
  const { base, indicator, wrapper } = styles$4({ variant, indicatorPosition });
  return /* @__PURE__ */ jsxs(
    Select.Item,
    {
      "data-slot": "select-item",
      className: base({
        className
      }),
      ...props,
      children: [
        /* @__PURE__ */ jsxs("div", { className: wrapper(), children: [
          icon,
          /* @__PURE__ */ jsx(
            Select.ItemText,
            {
              className: "flex flex-1 shrink-0 gap-2 whitespace-nowrap",
              children
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Select.ItemIndicator, { render: /* @__PURE__ */ jsx("span", { className: indicator() }), children: /* @__PURE__ */ jsx(CheckIcon, { className: "pointer-events-none" }) })
      ]
    }
  );
}
const styles$3 = tv({
  base: `rounded-md flex justify-between items-center gap-2 min-w-0 min-h-9 px-3 py-1
    shadow-sm text-base md:text-sm transition-[background,color,box-shadow]
    focus-visible:outline-offset-2 focus-visible:outline-[3px]
    aria-invalid:ring-3 aria-invalid:ring-destructive/35
    placeholder:text-muted-foreground
    disabled:pointer-events-none disabled:cursor-not-allowed
    disabled:opacity-50
    [&_svg]:pointer-events-none
    [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer`,
  variants: {
    color: {
      default: `bg-background-light focus-visible:outline-background-light! [&_svg:not([class*='text-'])]:text-muted-foreground`,
      neutral: `bg-neutral placeholder:text-neutral-foreground focus-visible:outline-neutral!`,
      primary: `bg-primary placeholder:text-primary-foreground focus-visible:outline-primary!`,
      secondary: `bg-secondary placeholder:text-secondary-foreground focus-visible:outline-secondary!`,
      success: `bg-success placeholder:text-success-foreground focus-visible:outline-success!`,
      warning: `bg-warning placeholder:text-warning-foreground focus-visible:outline-warning!`,
      destructive: `bg-destructive placeholder:text-destructive-foreground focus-visible:outline-destructive!`,
      info: `bg-info placeholder:text-info-foreground focus-visible:outline-info!`
    },
    blur: {
      true: "backdrop-blur-xs"
    }
  }
});
function SelectTrigger({
  className,
  blur,
  size = "default",
  color = "default",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Select.Trigger,
    {
      "data-slot": "select-trigger",
      "data-size": size,
      className: styles$3({ color, blur, className }),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(Select.Icon, { children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
tv({
  base: `bg-background data-open:animate-in
    data-closed:animate-out fixed z-50 flex flex-col gap-4
    shadow-lg transition ease-in-out data-closed:duration-300
    data-open:duration-500`,
  variants: {
    side: {
      top: `data-closed:slide-out-to-top
        data-open:slide-in-from-top inset-x-0 top-0 h-auto border-b`,
      right: `data-closed:slide-out-to-right
        data-open:slide-in-from-right inset-y-0 right-0 h-full w-3/4
        border-l sm:max-w-sm`,
      bottom: `data-closed:slide-out-to-bottom
        data-open:slide-in-from-bottom inset-x-0 bottom-0 h-auto
        border-t`,
      left: `data-closed:slide-out-to-left
        data-open:slide-in-from-left inset-y-0 left-0 h-full w-3/4
        border-r sm:max-w-sm`
    }
  }
});
const styles$2 = tv({
  base: `shrink-0 data-[orientation=horizontal]:h-px
    data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full
    data-[orientation=vertical]:w-px`,
  variants: {
    appearance: {
      solid: "bg-(--separator-color)",
      gradient: "[border-image:linear-gradient(to_var(--gradient-direction),transparent,var(--separator-color),transparent)_1]"
    },
    orientation: {
      horizontal: "",
      vertical: ""
    },
    color: {
      default: `[--separator-color:var(--background-light)]`,
      neutral: `[--separator-color:var(--neutral)]`,
      primary: `[--separator-color:var(--primary)]`,
      secondary: `[--separator-color:var(--secondary)]`,
      success: `[--separator-color:var(--success)]`,
      warning: `[--separator-color:var(--warning)]`,
      destructive: `[--separator-color:var(--destructive)]`,
      info: `[--separator-color:var(--info)]`
    }
  },
  compoundVariants: [
    //#region appearance=gradient & orientation
    {
      appearance: "gradient",
      orientation: "horizontal",
      className: "border-t [--gradient-direction:right]"
    },
    {
      appearance: "gradient",
      orientation: "vertical",
      className: "border-l [--gradient-direction:bottom]"
    }
    //#endregion
  ]
});
function Separator({
  className,
  appearance = "solid",
  orientation = "horizontal",
  color = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Separator$1,
    {
      "data-slot": "separator",
      orientation,
      className: styles$2({ color, appearance, orientation, className }),
      ...props
    }
  );
}
const styles$1 = tv({
  base: `animate-pulse rounded-md`,
  variants: {
    color: {
      default: `bg-background-light`,
      neutral: `bg-neutral/20`,
      primary: `bg-primary/20`,
      secondary: `bg-secondary/20`,
      success: `bg-success/20`,
      warning: `bg-warning/20`,
      destructive: `bg-destructive/20`,
      info: `bg-info/20`
    }
  }
});
function Skeleton({
  className,
  color = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: styles$1({ color, className }),
      ...props
    }
  );
}
const styleVariants = tv({
  base: `peer bg-background-light inline-flex  h-[1.15rem] w-8
    shrink-0 cursor-pointer items-center rounded-full shadow-xs transition-all
    data-disabled:pointer-events-none data-disabled:opacity-50
    focus-visible:outline-2 focus-visible:outline-offset-2
    aria-invalid:ring-3 aria-invalid:ring-destructive/35`,
  slots: {
    thumb: `bg-background data-unchecked:bg-foreground pointer-events-none block
      size-4 rounded-full ring-0 transition-transform
      data-checked:translate-x-[calc(100%-2px)]
      data-unchecked:translate-x-0`
  },
  variants: {
    color: {
      default: {
        base: "data-checked:bg-default focus-visible:outline-default/80!",
        thumb: "data-checked:bg-default-foreground"
      },
      neutral: {
        base: "data-checked:bg-neutral-light focus-visible:outline-neutral-light/80!",
        thumb: "data-checked:bg-neutral-light-foreground"
      },
      primary: {
        base: "data-checked:bg-primary focus-visible:outline-primary/80!",
        thumb: "data-checked:bg-primary-foreground"
      },
      secondary: {
        base: "data-checked:bg-secondary focus-visible:outline-secondary/80!",
        thumb: "data-checked:bg-secondary-foreground"
      },
      success: {
        base: "data-checked:bg-success focus-visible:outline-success/80!",
        thumb: "data-checked:bg-success-foreground"
      },
      warning: {
        base: "data-checked:bg-warning focus-visible:outline-warning/80!",
        thumb: "data-checked:bg-warning-foreground"
      },
      destructive: {
        base: "data-checked:bg-destructive focus-visible:outline-destructive/80!",
        thumb: "data-checked:bg-destructive-foreground"
      },
      info: {
        base: "data-checked:bg-info focus-visible:outline-info/80!",
        thumb: "data-checked:bg-info-foreground"
      }
    }
  }
});
function Switch({
  className,
  color = "primary",
  ...props
}) {
  const styles2 = styleVariants({ color, className });
  return /* @__PURE__ */ jsx(Switch$1.Root, { "data-slot": "switch", className: styles2.base(), ...props, children: /* @__PURE__ */ jsx(Switch$1.Thumb, { "data-slot": "switch-thumb", className: styles2.thumb() }) });
}
createContext(null);
Tooltip.createHandle;
Tooltip.Handle;
tv({
  base: `peer/menu-button
    flex w-full items-center gap-2
    overflow-hidden rounded-md p-2
    text-left text-sm
    outline-hidden ring-sidebar-ring
    transition-[width,height,padding]
    hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
    focus-visible:ring-2
    active:bg-sidebar-accent active:text-sidebar-accent-foreground
    disabled:pointer-events-none disabled:opacity-50
    group-has-data-[sidebar=menu-action]/menu-item:pr-8
    aria-disabled:pointer-events-none
    aria-disabled:opacity-50
    data-[active=true]:bg-sidebar-accent
    data-[active=true]:font-medium
    data-[active=true]:text-sidebar-accent-foreground
    data-[state=open]:hover:bg-sidebar-accent
    data-[state=open]:hover:text-sidebar-accent-foreground
    group-data-[collapsible=icon]:size-8!
    group-data-[collapsible=icon]:p-2!
    [&>span:last-child]:truncate
    [&>svg]:size-4 [&>svg]:shrink-0
    cursor-pointer`,
  variants: {
    variant: {
      default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      outline: `bg-background
        shadow-[0_0_0_1px_hsl(var(--sidebar-border))]
        hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]`
    },
    size: {
      default: "h-8 text-sm",
      sm: "h-7 text-xs",
      lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
const tabsListVariants = tv({
  base: `inline-flex relative z-0 px-1 gap-1 inset-shadow-2xs
    rounded-md data-[variant=line]:rounded-none
    group/tabs-list
    w-fit items-center justify-center
    group-data-[orientation=vertical]/tabs:h-fit
    group-data-[orientation=vertical]/tabs:flex-col`,
  variants: {
    variant: {
      default: "bg-muted",
      line: "gap-1 bg-transparent"
    }
  }
});
function TabsList({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tabs.List,
    {
      "data-slot": "tabs-list",
      "data-variant": variant,
      className: tabsListVariants({ variant, className }),
      ...props
    }
  );
}
const createToastManager = () => {
  const toastManager2 = Toast.createToastManager();
  const add = toastManager2.add.bind(toastManager2);
  const creator = (type) => (data) => {
    return add({
      type,
      ...data
    });
  };
  return {
    ...toastManager2,
    " subscribe": toastManager2[" subscribe"].bind(toastManager2),
    add,
    close: toastManager2.close.bind(toastManager2),
    promise: toastManager2.promise.bind(toastManager2),
    update: toastManager2.update.bind(toastManager2),
    success: creator("success"),
    error: creator("error"),
    info: creator("info"),
    warning: creator("warning")
  };
};
const useToastManager = () => {
  return Toast.useToastManager();
};
function ToastAction({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Action,
    {
      "data-slot": "toast-action",
      className: cn("", className),
      ...props
    }
  );
}
function ToastClose({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Close,
    {
      "data-slot": "toast-close",
      render: /* @__PURE__ */ jsx(Button, { appearance: "ghost", color: "default" }),
      className: cn("absolute top-2 right-2 size-5 p-0!", className),
      ...props
    }
  );
}
function ToastContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Content,
    {
      "data-slot": "toast-content",
      className: cn(
        "overflow-hidden transition-opacity",
        "data-behind:opacity-0",
        "data-expanded:opacity-100",
        className
      ),
      ...props
    }
  );
}
function ToastDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Toast.Description,
    {
      "data-slot": "toast-description",
      className: cn("m-0 text-base", className),
      ...props
    }
  );
}
const ErrorIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z",
        clipRule: "evenodd"
      }
    )
  }
);
const InfoIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z",
        clipRule: "evenodd"
      }
    )
  }
);
const SuccessIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    height: "20",
    width: "20",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
        clipRule: "evenodd"
      }
    )
  }
);
const WarningIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    height: "20",
    width: "20",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        clipRule: "evenodd"
      }
    )
  }
);
const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon
};
const styles = tv({
  base: "",
  variants: {
    type: {
      success: "fill-success-light",
      error: "fill-destructive-light",
      info: "fill-info-light",
      warning: "fill-warning-light"
    }
  }
});
const ToastIcon = ({ type, className, ...props }) => {
  if (!type || !(type in icons)) return;
  const Icon = icons[type];
  return /* @__PURE__ */ jsx(
    Icon,
    {
      ...props,
      className: styles({ type, className })
    }
  );
};
function ToastPortal(props) {
  return /* @__PURE__ */ jsx(Toast.Portal, { "data-slot": "toast-portal", ...props });
}
function ToastProvider(props) {
  return /* @__PURE__ */ jsx(Toast.Provider, { ...props });
}
function ToastRoot({ className, style, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Root,
    {
      "data-slot": "toast-root",
      style: {
        "--gap": "0.75rem",
        "--peek": "0.75rem",
        "--scale": "calc(max(0, 1 - (var(--toast-index) * 0.1)))",
        "--shrink": "calc(1 - var(--scale))",
        "--height": "var(--toast-frontmost-height, var(--toast-height))",
        "--offset-y": `calc(
            var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) +
            var(--toast-swipe-movement-y)
          )`,
        ...style
      },
      className: cn(
        "absolute right-0 m-[0_auto]",
        "box-border w-full border p-4",
        "bg-background shadow-lg",
        "rounded-md bg-clip-padding",
        "origin-[bottom_center]",
        "bottom-0 left-auto mr-0",
        "transition-all",
        "z-[calc(1000-var(--toast-index))]",
        "h-(--height)",
        "cursor-default select-none",
        "translate-x-(--toast-swipe-movement-x)",
        "translate-y-[calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--peek))-(var(--shrink)*var(--height)))]",
        "not-data-expanded:scale-(--scale)",
        `data-expanded:h-(--toast-height)
        data-expanded:translate-y-(--offset-y)`,
        "data-starting-style:translate-y-[150%]",
        "data-ending-style:translate-y-[150%] data-ending-style:opacity-0",
        "data-limited:opacity-0",
        `after:absolute after:top-full after:left-0
        after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']`,
        className
      ),
      ...props
    }
  );
}
function ToastTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Title,
    {
      "data-slot": "toast-title",
      className: cn("m-0 text-base font-medium", className),
      ...props
    }
  );
}
function ToastViewport({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Toast.Viewport,
    {
      "data-slot": "toast-viewport",
      className: cn(
        `fixed top-auto right-4 bottom-4 left-auto z-10 m-[0_auto] w-[250px]
        sm:right-8 sm:bottom-8`,
        className
      ),
      ...props
    }
  );
}
const toastManager = createToastManager();
const ToastList = () => {
  const { toasts } = useToastManager();
  return toasts.map((toast) => /* @__PURE__ */ jsx(ToastRoot, { toast, children: /* @__PURE__ */ jsxs(ToastContent, { children: [
    /* @__PURE__ */ jsx(ToastTitle, {}),
    /* @__PURE__ */ jsx(ToastDescription, {}),
    /* @__PURE__ */ jsx(ToastAction, {}),
    /* @__PURE__ */ jsx(ToastClose, { children: /* @__PURE__ */ jsx(XIcon, {}) })
  ] }) }, toast.id));
};
const Toaster = ({ children }) => {
  return /* @__PURE__ */ jsxs(ToastProvider, { toastManager, children: [
    children,
    /* @__PURE__ */ jsx(ToastPortal, { children: /* @__PURE__ */ jsx(ToastViewport, { children: /* @__PURE__ */ jsx(ToastList, {}) }) })
  ] });
};
function Header() {
  return /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between px-2 py-1", children: [
      /* @__PURE__ */ jsxs("nav", { className: "flex gap-4 text-lg container mx-auto", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: "Bot" }),
        /* @__PURE__ */ jsx(Link, { to: "/campaign", children: "Campaign" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2" })
    ] }),
    /* @__PURE__ */ jsx(Separator, {})
  ] });
}
const appCss = "/assets/index-CcRTbTW0.css";
const Route$3 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Firestone"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  component: RootDocument
});
function RootDocument() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      false,
      /* @__PURE__ */ jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Toaster, { children: /* @__PURE__ */ jsxs("div", { className: "grid h-svh grid-rows-[auto_1fr] gap-4", children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx(Outlet, {})
      ] }) }),
      /* @__PURE__ */ jsx(TanStackRouterDevtools, { position: "bottom-left" }),
      /* @__PURE__ */ jsx(ReactQueryDevtools, { position: "bottom", buttonPosition: "bottom-right" }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./campaign-DsNfH-2S.js");
const Route$2 = createFileRoute("/campaign")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-C6yIthI8.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    DATABASE_NAME: z.string().min(1),
    CORS_ORIGIN: z.url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    BOT_SERVICE_NAME: z.string().min(1)
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true
});
const papr = new Papr();
const client = new MongoClient(env.DATABASE_URL);
const artifactRarityList = [
  "epic",
  "legendary",
  "mythic",
  "titan",
  "angel",
  "celestial",
  "immortal",
  "primordial"
];
const artifactTypeBaseData = {
  list: artifactRarityList,
  toPercent: {
    epic: 30,
    legendary: 35,
    mythic: 40,
    titan: 45,
    angel: 50,
    celestial: 55,
    immortal: 60,
    primordial: 65
  }
};
const rarityList = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
  "titan",
  "angel"
];
const warMachineRarityData = {
  list: rarityList,
  toLevel: {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    mythic: 5,
    titan: 6,
    angel: 7
  },
  fromLevel: {
    0: "common",
    1: "uncommon",
    2: "rare",
    3: "epic",
    4: "legendary",
    5: "mythic",
    6: "titan",
    7: "angel"
  },
  abilityActivationChance: {
    common: 25,
    uncommon: 28,
    rare: 31,
    epic: 34,
    legendary: 37,
    mythic: 40,
    titan: 43,
    angel: 46
  },
  unlockLevel: {
    common: 1,
    uncommon: 10,
    rare: 50,
    epic: 100,
    legendary: 150,
    mythic: 230,
    titan: 300,
    angel: 400
  }
};
const jewelList = [
  "ankh",
  "rune",
  "idol",
  "talisman",
  "necklace",
  "trinket"
];
const jewelBaseData = {
  list: jewelList,
  toTier: {
    ankh: 1,
    rune: 1,
    idol: 1,
    talisman: 2,
    necklace: 2,
    trinket: 2
  }
};
const artifact = papr.model(
  "artifacts",
  schema({
    attribute: types.enum(["damage", "health", "armor"], {
      required: true
    }),
    items: types.objectGeneric(
      types.number({ minimum: 0, required: true }),
      `^${artifactTypeBaseData.list.join("|")}$`,
      { required: true }
    )
  })
);
const difficulties = [
  "easy",
  "normal",
  "hard",
  "insane",
  "nightmare"
];
const campaignMission = papr.model(
  "campaignMissions",
  schema({
    level: types.number({ minimum: 1, required: true }),
    difficulty: types.enum(difficulties, { required: true }),
    attempts: types.number({ required: true }),
    startedAt: types.date(),
    wonAt: types.date()
  })
);
const guardians$1 = [
  "Vermillion",
  "Grace",
  "Ankaa",
  "Azhar",
  "auto"
];
const config = papr.model(
  "configs",
  schema({
    session: types.object(
      {
        id: types.string({ required: true }),
        status: types.enum(["valid", "invalid", "idle"], {
          required: true
        }),
        startedAt: types.date({ required: true })
      },
      { required: true }
    ),
    gameVersion: types.string({ required: true }),
    disabled: types.boolean(),
    features: types.object(
      {
        engineerTools: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        ),
        campaignLoot: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        ),
        campaignMission: types.object(
          {
            enabled: types.boolean({ required: true }),
            battleCooldownSeconds: types.number({ required: true })
          },
          { required: true }
        ),
        guardianTraining: types.object(
          {
            enabled: types.boolean({ required: true }),
            guardian: types.enum(guardians$1, { required: true }),
            cooldownSeconds: types.number({ required: true })
          },
          { required: true }
        ),
        firestoneResearch: types.object(
          {
            enabled: types.boolean({ required: true }),
            treeLevel: types.number({ required: true, minimum: 1 })
          },
          { required: true }
        ),
        guildExpedition: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        ),
        oracleRitual: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        ),
        pickaxesClaiming: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        ),
        alchemyExperiment: types.object(
          {
            enabled: types.boolean({ required: true }),
            treeLevel: types.number({ required: true, minimum: 1 }),
            blood: types.boolean({ required: true }),
            dust: types.boolean({ required: true }),
            exoticCoins: types.boolean({ required: true }),
            durationMinutes: types.number({ required: true })
          },
          { required: true }
        ),
        mapMission: types.object(
          {
            enabled: types.boolean({ required: true })
          },
          { required: true }
        )
      },
      { required: true }
    )
  })
);
papr.model(
  "firestoneLibraries",
  schema({
    treeLevel: types.number({ required: true }),
    upgrades: types.objectGeneric(
      types.object({ level: types.number({ required: true }) }),
      void 0,
      { required: true }
    )
  })
);
const jewel = types.object(
  {
    name: types.enum(jewelBaseData.list, { required: true }),
    tier: types.number({ minimum: 1, required: true }),
    level: types.number({ minimum: 0, required: true }),
    rarity: types.enum(warMachineRarityData.list, { required: true })
  },
  { required: true }
);
const hero = papr.model(
  "heroes",
  schema({
    name: types.string({ required: true }),
    jewels: types.array(jewel, { required: true })
  })
);
const warMachine = papr.model(
  "warMachines",
  schema({
    name: types.string({ required: true }),
    level: types.number({ minimum: 0, required: true }),
    sacredCardLevel: types.number({ minimum: 0, required: true }),
    lostInscriptionLevel: types.number({ minimum: 0, required: true }),
    damageBlueprintLevel: types.number({ minimum: 0, required: true }),
    healthBlueprintLevel: types.number({ minimum: 0, required: true }),
    armorBlueprintLevel: types.number({ minimum: 0, required: true }),
    rarity: types.enum(warMachineRarityData.list, { required: true })
  })
);
(async () => {
  await client.connect();
  papr.initialize(client.db(env.DATABASE_NAME));
  await papr.updateSchemas();
})().catch((error) => {
  console.error("DATABASE CONNECTION ERROR:", error);
});
const createTRPCContext = (opts) => {
  return {
    ...opts
  };
};
const t = initTRPC.context().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null
      }
    };
  }
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
const timingMiddleware = t.middleware(async ({ next, path }) => {
  const start = Date.now();
  if (t._config.isDev) {
    const waitMs = Math.floor(Math.random() * 400) + 100;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
  }
  const result = await next();
  const end = Date.now();
  console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  return result;
});
const publicProcedure = t.procedure.use(timingMiddleware);
const guardians = [
  "Vermillion",
  "Grace",
  "Ankaa",
  "Azhar",
  "auto"
];
const botRouter = createTRPCRouter({
  findConfig: publicProcedure.query(async () => {
    const config$1 = await config.findOne({});
    if (config$1) {
      return {
        ...config$1,
        _id: config$1._id.toString()
      };
    }
  }),
  updatePartial: publicProcedure.input(
    z.object({
      _id: z.string(),
      data: z.object({
        session: z.object({
          id: z.string().optional()
        }).optional(),
        gameVersion: z.string().optional(),
        features: z.object({
          engineerTools: z.object({
            enabled: z.boolean().optional()
          }).optional(),
          campaignLoot: z.object({
            enabled: z.boolean().optional()
          }).optional(),
          campaignMission: z.object({
            enabled: z.boolean().optional(),
            battleCooldownSeconds: z.number().positive().optional()
          }).optional(),
          guardianTraining: z.object({
            enabled: z.boolean().optional(),
            guardian: z.enum(guardians).optional(),
            cooldownSeconds: z.number().positive().optional()
          }).optional(),
          firestoneResearch: z.object({
            enabled: z.boolean().optional(),
            treeLevel: z.number().min(1).optional()
          }).optional(),
          guildExpedition: z.object({
            enabled: z.boolean().optional()
          }).optional(),
          oracleRitual: z.object({
            enabled: z.boolean().optional()
          }).optional(),
          pickaxesClaiming: z.object({
            enabled: z.boolean().optional()
          }).optional(),
          alchemyExperiment: z.object({
            enabled: z.boolean().optional(),
            treeLevel: z.number().min(1).optional(),
            blood: z.boolean().optional(),
            dust: z.boolean().optional(),
            exoticCoins: z.boolean().optional(),
            durationMinutes: z.number().positive().optional()
          }).optional(),
          mapMission: z.object({
            enabled: z.boolean().optional(),
            squads: z.number().int().positive().optional()
          }).optional()
        }).optional()
      })
    })
  ).mutation(async ({ input }) => {
    const data = input.data;
    if (data.session?.id) {
      data.session.startedAt = /* @__PURE__ */ new Date();
      data.session.status = "idle";
    }
    await config.updateOne(
      { _id: new ObjectId(input._id) },
      { $set: flatten(data) }
    );
  }),
  restart: publicProcedure.mutation(async () => {
    try {
      const result = await execa(
        "sudo",
        ["systemctl", "restart", env.BOT_SERVICE_NAME],
        {
          timeout: 3e3
        }
      );
      if (result.failed || result.timedOut) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    } catch (error) {
      console.error(error);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  findLastMissions: publicProcedure.query(async () => {
    return await campaignMission.aggregate([
      {
        $sort: { level: -1 }
      },
      {
        $group: {
          _id: "$difficulty",
          mission: {
            $first: "$$ROOT"
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: "$mission"
        }
      }
    ]);
  })
});
const warMachineRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const warMachines = await warMachine.find({});
    return warMachines.map((warMachine2) => ({
      ...warMachine2,
      _id: warMachine2._id.toString()
    }));
  }),
  updateOne: publicProcedure.input(
    z.object({
      name: z.string(),
      level: z.number().min(0).default(0),
      sacredCardLevel: z.number().min(0).default(0),
      lostInscriptionLevel: z.number().min(0).default(0),
      damageBlueprintLevel: z.number().min(0).default(0),
      healthBlueprintLevel: z.number().min(0).default(0),
      armorBlueprintLevel: z.number().min(0).default(0),
      rarity: z.enum(warMachineRarityData.list).default("common")
    })
  ).mutation(async ({ input }) => {
    await warMachine.upsert({ name: input.name }, { $set: input });
  })
});
const heroRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const heroes = await hero.find({});
    return heroes.map((hero2) => ({
      ...hero2,
      _id: hero2._id.toString()
    }));
  }),
  updateOne: publicProcedure.input(
    z.object({
      name: z.string(),
      jewels: z.array(
        z.object({
          name: z.enum(jewelBaseData.list),
          tier: z.number().min(1),
          level: z.number().min(0),
          rarity: z.enum(warMachineRarityData.list)
        })
      )
    })
  ).mutation(async ({ input }) => {
    await hero.upsert({ name: input.name }, { $set: input });
  })
});
const artifactRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const artifacts = await artifact.find({});
    return artifacts.map((artifact2) => ({
      ...artifact2,
      _id: artifact2._id.toString()
    }));
  }),
  updateOne: publicProcedure.input(
    z.object({
      attribute: z.enum(["damage", "health", "armor"]),
      rarity: z.enum(artifactTypeBaseData.list),
      count: z.number().min(0)
    })
  ).mutation(async ({ input }) => {
    await artifact.upsert(
      { attribute: input.attribute },
      {
        // @ts-expect-error papr doesn't handle typesafety for flat
        // objects but it does work
        $set: {
          attribute: input.attribute,
          [`items.${input.rarity}`]: input.count
        }
      }
    );
  })
});
const appRouter = createTRPCRouter({
  bot: botRouter,
  warMachine: warMachineRouter,
  hero: heroRouter,
  artifact: artifactRouter
});
createCallerFactory(appRouter);
function handler({ request }) {
  return fetchRequestHandler({
    req: request,
    router: appRouter,
    createContext: () => {
      return createTRPCContext({
        headers: request.headers
      });
    },
    endpoint: "/api/trpc"
  });
}
const Route = createFileRoute("/api/trpc/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler
    }
  }
});
const CampaignRoute = Route$2.update({
  id: "/campaign",
  path: "/campaign",
  getParentRoute: () => Route$3
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const ApiTrpcSplatRoute = Route.update({
  id: "/api/trpc/$",
  path: "/api/trpc/$",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  CampaignRoute,
  ApiTrpcSplatRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext$1();
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      toastManager.add({
        description: error.message,
        actionProps: {
          children: "retry",
          onClick: query.invalidate
        }
      });
    }
  }),
  defaultOptions: {
    queries: { staleTime: 60 * 1e3 },
    dehydrate: {
      serializeData: SuperJSON.serialize,
      shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === "pending"
    },
    hydrate: {
      deserializeData: SuperJSON.deserialize
    }
  }
});
const trpcClient = createTRPCClient({
  links: [
    httpBatchLink({
      transformer: SuperJSON,
      url: "/api/trpc"
    })
  ]
});
const trpc = createTRPCOptionsProxy({
  client: trpcClient,
  queryClient
});
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { trpc, queryClient },
    defaultPendingComponent: () => /* @__PURE__ */ jsx(Loader, {}),
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx("div", { children: "Not Found" }),
    Wrap: ({ children }) => /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(TRPCProvider, { trpcClient, queryClient, children }) })
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter,
  queryClient,
  trpc
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  CardRoot as C,
  DataTableProvider as D,
  FieldRoot as F,
  Input as I,
  NumberFieldInput as N,
  ProgressTrack as P,
  Spinner as S,
  TableRow as T,
  TableHeader as a,
  artifactTypeBaseData as b,
  cn as c,
  useTRPC as d,
  Switch as e,
  ProgressIndicator as f,
  ScrollAreaViewport as g,
  ScrollAreaContent as h,
  ScrollAreaScrollbar as i,
  InputGroupRoot as j,
  InputGroupAddon as k,
  Skeleton as l,
  jewelBaseData as m,
  TabsList as n,
  Separator as o,
  createToastManager as p,
  useToastManager as q,
  ToastIcon as r,
  SelectTrigger as s,
  SelectContent as t,
  useDataTableContext as u,
  SelectItem as v,
  warMachineRarityData as w,
  router as x
};
