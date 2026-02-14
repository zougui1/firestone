import { ChevronLeftIcon } from "lucide-react";

import { PaginationLink, type PaginationLinkProps } from "./PaginationLink";
import { cn } from "../../../utils";

export interface PaginationPreviousProps extends PaginationLinkProps {}

export function PaginationPrevious({
  className,
  ...props
}: PaginationPreviousProps) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("pl-1.5!", className)}
      {...props}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}
