import { cn } from "~/ui/utils";

export interface TypographyH2Props extends React.ComponentProps<"h2"> {}

export const TypographyH2 = ({ className, ...props }: TypographyH2Props) => {
  return (
    <h2
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
};
