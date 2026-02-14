import { Button } from "@base-ui/react";

import { cn } from "~/ui/utils";

export type SidebarGroupActionProps = Button.Props;

export function SidebarGroupAction({
  className,
  ...props
}: SidebarGroupActionProps) {
  return (
    <Button
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        `text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent
        hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex
        aspect-square w-5 cursor-pointer items-center justify-center rounded-md
        p-0 outline-hidden transition-transform focus-visible:ring-2
        [&>svg]:size-4 [&>svg]:shrink-0`,
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
}
