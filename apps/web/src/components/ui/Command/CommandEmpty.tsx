'use client';

import { Command as CommandPrimitive } from 'cmdk';

export const CommandEmpty = (props: CommandEmptyProps) => {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  );
}

export interface CommandEmptyProps extends React.ComponentProps<typeof CommandPrimitive.Empty> {

}
