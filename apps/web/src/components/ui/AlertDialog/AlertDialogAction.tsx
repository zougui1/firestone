'use client';

import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { cn } from '../utils';
import { buttonVariants, type ButtonProps } from '../Button';

export const AlertDialogAction = ({ className, variant, ...props }: AlertDialogActionProps) => {
  return (
    <AlertDialogPrimitive.Action
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export interface AlertDialogActionProps extends React.ComponentProps<typeof AlertDialogPrimitive.Action> {
  variant?: ButtonProps['variant'];
}
