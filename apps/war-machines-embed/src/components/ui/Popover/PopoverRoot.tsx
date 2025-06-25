'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export const PopoverRoot = (props: PopoverRootProps) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export interface PopoverRootProps extends React.ComponentProps<typeof PopoverPrimitive.Root> {

}
