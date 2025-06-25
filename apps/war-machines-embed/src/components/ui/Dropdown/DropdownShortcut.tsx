import { cn } from '../utils';

export const DropdownShortcut = ({ className, ...props }: DropdownShortcutProps) => {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

export interface DropdownShortcutProps extends React.ComponentProps<'span'> {

}
