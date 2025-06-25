'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownRoot = (props: DropdownRootProps) => {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

export interface DropdownRootProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Root> {

}
