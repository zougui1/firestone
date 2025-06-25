'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownPortal = (props: DropdownPortalProps) => {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

export interface DropdownPortalProps extends React.ComponentProps<typeof DropdownMenuPrimitive.Portal> {

}
