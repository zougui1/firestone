import { cn } from "../../../utils";

export interface TableHeadProps extends React.ComponentProps<"th"> {}

export function TableHead({ className, ...props }: TableHeadProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `text-foreground h-10 px-2 text-left align-middle font-medium
        whitespace-nowrap [&:has([role=checkbox])]:pr-0`,
        className,
      )}
      {...props}
    />
  );
}
