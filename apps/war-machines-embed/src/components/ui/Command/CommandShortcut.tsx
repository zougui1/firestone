import { cn } from '../utils';

export const CommandShortcut = ({ className, ...props }: CommandShortcutProps) => {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  );
}

export interface CommandShortcutProps extends React.ComponentProps<'span'> {

}
