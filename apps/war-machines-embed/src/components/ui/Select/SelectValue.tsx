'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

export const SelectValue = (props: SelectValueProps) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export interface SelectValueProps extends React.ComponentProps<typeof SelectPrimitive.Value> {

}
