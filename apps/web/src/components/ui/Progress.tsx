'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from './utils';

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          'h-full flex-1 bg-primary',
          value === undefined
            ? 'absolute w-1/3 animate-[indeterminate_1.5s_infinite]'
            : 'w-full transition-all',
        )}
        style={value !== undefined
          ? { transform: `translateX(-${100 - (value ?? 0)}%)` }
          : undefined
        }
      />
    </ProgressPrimitive.Root>
  );
}

export interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root>{

}
