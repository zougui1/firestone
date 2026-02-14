import { cn } from "~/ui/utils";

import { Input, type InputProps } from "../Input";

export interface InputGroupInputProps extends InputProps {}

export function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        `flex-1 rounded-none border-0 bg-transparent shadow-none ring-0
        focus-visible:outline-0 disabled:bg-transparent aria-invalid:ring-0`,
        className,
      )}
      {...props}
    />
  );
}
