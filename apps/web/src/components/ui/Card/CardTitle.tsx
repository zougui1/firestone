import React from 'react';

import { cn } from '../utils';

export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  );
}

export interface CardTitleProps extends React.ComponentProps<'div'> {

}
