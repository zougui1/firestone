import { cn } from "~/ui/utils";

export interface SheetFooterProps extends React.ComponentProps<"div"> {}

export function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}
