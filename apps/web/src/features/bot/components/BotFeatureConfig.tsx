'use client';

import { cn, Switch, Typography } from '~/components/ui';

export const BotFeatureConfig = ({ label, enabled, onEnabledChange, className, children }: BotFeatureConfigProps) => {
  return (
    <section className="flex flex-col gap-4 pb-4">
      <div className="flex items-center gap-2">
        <Typography.H4>{label}</Typography.H4>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </div>

      {children && (
        <div className={cn('flex gap-4', className)}>
          {children}
        </div>
      )}
    </section>
  );
}

export interface BotFeatureConfigProps {
  label: string;
  enabled: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}
