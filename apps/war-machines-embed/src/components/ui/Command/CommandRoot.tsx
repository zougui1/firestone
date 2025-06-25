'use client';

import { Command as CommandPrimitive } from 'cmdk';

import { cn } from '../utils';

export const CommandRoot = ({ className, ...props }: CommandRootProps) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
        className,
      )}
      {...props}
    />
  );
}

export interface CommandRootProps extends React.ComponentProps<typeof CommandPrimitive> {

}
