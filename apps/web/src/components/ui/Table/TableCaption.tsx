import { cn } from '../utils';

export const TableCaption = ({
  className,
  ...props
}: TableCaptionProps) => {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export interface TableCaptionProps extends React.ComponentProps<'caption'> {

}
