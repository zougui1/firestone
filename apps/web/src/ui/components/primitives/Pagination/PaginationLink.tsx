import { Button, type ButtonProps } from "../Button";
import { cn } from "../../../utils";

export interface PaginationLinkProps
  extends Pick<ButtonProps, "size">, React.ComponentProps<"a"> {
  isActive?: boolean;
}

export function PaginationLink({
  isActive,
  size = "icon",
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    >
      <Button
        appearance={isActive ? "outline" : "ghost"}
        size={size}
        nativeButton={false}
      >
        {children}
      </Button>
    </a>
  );
  return (
    <Button
      appearance={isActive ? "outline" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a
          aria-current={isActive ? "page" : undefined}
          data-slot="pagination-link"
          data-active={isActive}
          {...props}
        />
      }
    />
  );
}
