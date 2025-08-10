import React from 'react';

import { cn } from '../utils';

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

export interface CardHeaderProps extends React.ComponentProps<'div'> {

}
