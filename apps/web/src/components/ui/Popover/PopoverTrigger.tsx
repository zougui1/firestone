'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export const PopoverTrigger = (props: PopoverTriggerProps) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

export interface PopoverTriggerProps extends React.ComponentProps<typeof PopoverPrimitive.Trigger> {

}
