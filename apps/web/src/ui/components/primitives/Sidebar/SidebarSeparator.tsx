import { cn } from "~/ui/utils";

import { Separator, type SeparatorProps } from "../Separator";

export interface SidebarSeparatorProps extends SeparatorProps {}

export function SidebarSeparator({
  className,
  ...props
}: SidebarSeparatorProps) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn("bg-sidebar-border mx-2 w-auto", className)}
      {...props}
    />
  );
}
