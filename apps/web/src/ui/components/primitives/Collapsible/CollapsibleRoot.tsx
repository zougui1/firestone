"use client";

import { Collapsible as BaseCollapsible } from "@base-ui/react";

export interface CollapsibleRootProps extends BaseCollapsible.Root.Props {}

export function CollapsibleRoot(props: CollapsibleRootProps) {
  return <BaseCollapsible.Root data-slot="collapsible-root" {...props} />;
}
