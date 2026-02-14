import { cn } from "../../../utils";

export interface PaginationRootProps extends React.ComponentProps<"nav"> {}

export function PaginationRoot({ className, ...props }: PaginationRootProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination-root"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
