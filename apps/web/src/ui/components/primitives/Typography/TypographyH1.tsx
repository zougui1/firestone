import { cn } from "~/ui/utils";

export interface TypographyH1Props extends React.ComponentProps<"h1"> {}

export const TypographyH1 = ({ className, ...props }: TypographyH1Props) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-bold tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  );
};
