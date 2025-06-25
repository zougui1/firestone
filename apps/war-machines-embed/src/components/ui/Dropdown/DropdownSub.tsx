'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownSub = (props: DropdownSubProps) => {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

export interface DropdownSubProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Sub> {

}
