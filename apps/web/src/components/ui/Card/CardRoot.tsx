import React from 'react';

import { cn } from '../utils';

export const CardRoot = ({ className, ...props }: CardRootProps) => {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}

export interface CardRootProps extends React.ComponentProps<'div'> {

}
