"use client";

import { ScrollArea as BaseScrollArea } from "@base-ui/react";

export interface ScrollAreaCornerProps extends BaseScrollArea.Corner.Props {}

export const ScrollAreaCorner = (props: ScrollAreaCornerProps) => {
  return <BaseScrollArea.Corner data-slot="scroll-area-corner" {...props} />;
};
