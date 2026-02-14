import { ChevronRightIcon } from "lucide-react";

import { PaginationLink, type PaginationLinkProps } from "./PaginationLink";
import { cn } from "../../../utils";

export interface PaginationNextProps extends PaginationLinkProps {}

export function PaginationNext({ className, ...props }: PaginationNextProps) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("pr-1.5!", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}
