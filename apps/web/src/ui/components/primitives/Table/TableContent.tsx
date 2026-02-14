import { cn } from "../../../utils";

export interface TableContentProps extends React.ComponentProps<"table"> {}

export function TableContent({ className, ...props }: TableContentProps) {
  return (
    <table
      data-slot="table-content"
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  );
}
