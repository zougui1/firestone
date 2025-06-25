'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export const PopoverAnchor = (props: PopoverAnchorProps) => {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export interface PopoverAnchorProps extends React.ComponentProps<typeof PopoverPrimitive.Anchor> {

}
