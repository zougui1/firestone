'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

export const SelectGroup = (props: SelectGroupProps) => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export interface SelectGroupProps extends React.ComponentProps<typeof SelectPrimitive.Group> {

}
