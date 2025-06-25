'use client';

import * as SelectPrimitive from '@radix-ui/react-select';

import { cn } from '../utils';

export const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

export interface SelectLabelProps extends React.ComponentProps<typeof SelectPrimitive.Label> {

}
