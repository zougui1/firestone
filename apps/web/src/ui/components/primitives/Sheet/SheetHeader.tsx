import { cn } from "~/ui/utils";

export interface SheetHeaderProps extends React.ComponentProps<"div"> {}

export function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}
