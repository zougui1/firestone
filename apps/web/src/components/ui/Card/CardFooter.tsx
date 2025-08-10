import React from 'react';

import { cn } from '../utils';

export const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  );
}

export interface CardFooterProps extends React.ComponentProps<'div'> {

}
