import { cn } from "../../../utils";

export interface TableRootProps extends React.ComponentProps<"div"> {}

export function TableRoot({ className, ...props }: TableRootProps) {
  return (
    <div
      data-slot="table-root"
      className={cn(
        "bg-background w-full rounded-lg border shadow-md",
        "grid grid-rows-[1fr_auto]",
        className,
      )}
      {...props}
    />
  );
}
