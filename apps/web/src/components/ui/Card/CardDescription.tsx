import React from 'react';

import { cn } from '../utils';

export const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export interface CardDescriptionProps extends React.ComponentProps<'div'> {

}
