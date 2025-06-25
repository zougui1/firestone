'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownTrigger = (props: DropdownTriggerProps) => {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

export interface DropdownTriggerProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Trigger> {

}
