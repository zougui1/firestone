'use client';

import { cn, Switch, Typography } from '~/components/ui';
import { Card } from '~/components/ui/Card';

export const BotFeatureConfig = ({ label, enabled, onEnabledChange, children, className }: BotFeatureConfigProps) => {
  return (
    <Card.Root className="w-5/12">
      <Card.Header className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Switch
          checked={enabled}
          onCheckedChange={onEnabledChange}
          className="cursor-pointer data-[state=checked]:bg-success"
        />
        <Typography.H4>{label}</Typography.H4>
      </Card.Header>

      {children && (
        <Card.Content className={cn('flex flex-wrap gap-4', className)}>
          {children}
        </Card.Content>
      )}
    </Card.Root>
  );
}

export interface BotFeatureConfigProps {
  label: string;
  enabled: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}
