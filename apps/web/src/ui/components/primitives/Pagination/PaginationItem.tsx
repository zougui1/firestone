export interface PaginationItemProps extends React.ComponentProps<"li"> {}

export function PaginationItem(props: PaginationItemProps) {
  return <li data-slot="pagination-item" {...props} />;
}
