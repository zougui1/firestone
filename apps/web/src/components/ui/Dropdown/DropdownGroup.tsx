'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownGroup = (props: DropdownGroupProps) => {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

export interface DropdownGroupProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Group> {

}
