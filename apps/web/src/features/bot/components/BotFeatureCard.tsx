import { Card, cn, Switch } from "~/ui";

export interface BotFeatureCardProps extends Card.ContentProps {
  label: React.ReactNode;
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
}

export const BotFeatureCard = ({
  label,
  enabled,
  onEnabledChange,
  children,
  className,
  ...props
}: BotFeatureCardProps) => {
  return (
    <Card.Root className="w-full">
      <Card.Header className="flex items-center gap-2">
        <Switch
          checked={enabled}
          onCheckedChange={onEnabledChange}
          color="success"
        />
        <Card.Title>{label}</Card.Title>
      </Card.Header>

      {children && (
        <Card.Content
          {...props}
          className={cn("flex flex-wrap gap-4", className)}
        >
          {children}
        </Card.Content>
      )}
    </Card.Root>
  );
};
