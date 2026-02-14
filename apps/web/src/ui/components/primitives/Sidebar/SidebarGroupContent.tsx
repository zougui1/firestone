import { cn } from "~/ui/utils";

export interface SidebarGroupContentProps extends React.ComponentProps<"div"> {}

export function SidebarGroupContent({
  className,
  ...props
}: SidebarGroupContentProps) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  );
}
