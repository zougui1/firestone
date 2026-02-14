import { cn } from "../../../utils";

export interface TableViewportProps extends React.ComponentProps<"div"> {}

export function TableViewport({ className, ...props }: TableViewportProps) {
  return (
    <div
      data-slot="table-viewport"
      className={cn("relative w-full overflow-x-auto shadow-md", className)}
      {...props}
    />
  );
}
