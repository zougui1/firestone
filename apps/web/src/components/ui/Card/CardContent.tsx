import React from 'react';

import { cn } from '../utils';

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  );
}

export interface CardContentProps extends React.ComponentProps<'div'> {

}
