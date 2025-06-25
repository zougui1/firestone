'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronUpIcon } from 'lucide-react';

import { cn } from '../utils';

export const SelectScrollUpButton = ({ className, ...props }: SelectScrollUpButtonProps) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

export interface SelectScrollUpButtonProps extends React.ComponentProps<typeof SelectPrimitive.ScrollUpButton> {

}
