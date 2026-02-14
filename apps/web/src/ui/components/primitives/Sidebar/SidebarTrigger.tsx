"use client";

import { PanelLeftIcon } from "lucide-react";

import { cn } from "~/ui/utils";

import { useSidebar } from "./context";
import { Button, type ButtonProps } from "../Button";

export type SidebarTriggerProps = ButtonProps;

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      appearance="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
