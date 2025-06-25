import { cn } from '../utils';

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return (
    <thead
      data-slot="table-header"
      className={cn('[&_tr]:border-b', className)}
      {...props}
    />
  );
}

export interface TableHeaderProps extends React.ComponentProps<'thead'> {

}
