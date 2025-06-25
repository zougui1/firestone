'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

export const SelectRoot = (props: SelectRootProps) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export interface SelectRootProps extends React.ComponentProps<typeof SelectPrimitive.Root> {

}
