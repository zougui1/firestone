import { useRef } from "react";

import { NumberField, InputGroup, cn } from "~/ui";

export interface BadgeInputProps extends NumberField.RootProps {
  label: React.ReactNode;
  addon?: React.ReactElement;
  slotProps?: {
    input?: Partial<InputGroup.InputProps>;
  };
}

export const BadgeInput = ({
  label,
  className,
  slotProps,
  addon,
  ...props
}: BadgeInputProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return (
    <InputGroup.Root
      className={cn(
        "group bg-background-light/70 h-auto rounded-full",
        className,
      )}
    >
      <InputGroup.Addon
        className={cn(
          "py-0.5 text-white",
          typeof label === "string" ? "pl-1.5" : "pl-1",
        )}
      >
        {label}
      </InputGroup.Addon>

      {addon && (
        <InputGroup.Addon className="py-0.5 pl-1 text-white">
          {addon}
        </InputGroup.Addon>
      )}

      <NumberField.Root largeStep={5} defaultValue={0} {...props}>
        <InputGroup.Input
          render={<NumberField.Input />}
          onFocus={(e) => setTimeout(() => e.target.select(), 0)}
          onMouseEnter={(e) => {
            const { currentTarget } = e;
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => currentTarget.focus(), 500);
          }}
          onMouseLeave={() => clearTimeout(timeoutRef.current)}
          {...slotProps?.input}
          className={cn("w-[4ch] px-1 py-0", slotProps?.input?.className)}
        />
      </NumberField.Root>
    </InputGroup.Root>
  );
};
