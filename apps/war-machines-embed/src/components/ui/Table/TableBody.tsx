import { cn } from '../utils';

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  );
}

export interface TableBodyProps extends React.ComponentProps<'tbody'> {

}
