import { cn } from "~/ui/utils";

import { Input, type InputProps } from "../Input";

export interface SidebarInputProps extends InputProps {}

export function SidebarInput({ className, ...props }: SidebarInputProps) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  );
}
