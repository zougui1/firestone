'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

import { cn } from '../utils';

export const DropdownSeparator = ({
  className,
  ...props
}: DropdownSeparatorProps) => {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

export interface DropdownSeparatorProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Separator> {

}
