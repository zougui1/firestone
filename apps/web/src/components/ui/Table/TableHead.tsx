import { cn } from '../utils';

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 px-2 text-center align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeadProps extends React.ComponentProps<'th'> {

}
