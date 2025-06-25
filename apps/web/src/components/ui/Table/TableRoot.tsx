import { cn } from '../utils';

export const TableRoot = ({ className, ...props }: TableRootProps) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  );
}

export interface TableRootProps extends React.ComponentProps<'table'> {

}
