import { Table } from "../Table";
import { cn } from "../../../utils";

export interface DataTableViewportProps extends Table.ViewportProps {}

export const DataTableViewport = ({
  style,
  className,
  ...props
}: DataTableViewportProps) => {
  return (
    <Table.Viewport
      className={cn("inset-shadow-sm", className)}
      style={
        {
          "--tw-inset-shadow":
            "inset 0 0 2px var(--tw-inset-shadow-color, rgb(0 0 0 / 1.05))",
          ...style,
        } as React.CSSProperties
      }
      {...props}
    />
  );
};
