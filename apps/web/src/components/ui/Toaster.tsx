'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

import { cn } from './utils';

export const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
      } as React.CSSProperties}
      {...props}
      toastOptions={{
        className: 'group',
        classNames: {
          icon: cn(
            'group-data-[type="error"]:!text-destructive',
            'group-data-[type="success"]:!text-success',
          ),
        },
      }}
    />
  );
}
