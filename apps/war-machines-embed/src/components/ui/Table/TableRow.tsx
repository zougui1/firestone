import { cn } from '../utils';

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'hover:bg-muted/50 data-[highlighted=true]:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className,
      )}
      {...props}
    />
  );
}

export interface TableRowProps extends React.ComponentProps<'tr'> {

}
