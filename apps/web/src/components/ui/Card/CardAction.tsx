import React from 'react';

import { cn } from '../utils';

export const CardAction = ({ className, ...props }: CardActionProps) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  );
}

export interface CardActionProps extends React.ComponentProps<'div'> {

}
