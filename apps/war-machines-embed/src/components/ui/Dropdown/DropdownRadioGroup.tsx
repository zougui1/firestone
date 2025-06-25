'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export const DropdownRadioGroup = (props: DropdownRadioGroupProps) => {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

export interface DropdownRadioGroupProps extends React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup> {

}
