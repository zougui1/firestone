'use client';

import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '../utils';

export const CommandGroup = ({ className, ...props }: CommandGroupProps) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        'text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium',
        className,
      )}
      {...props}
    />
  );
}

export interface CommandGroupProps extends React.ComponentProps<typeof CommandPrimitive.Group> {

}
