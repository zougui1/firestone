import { cn } from "~/ui/utils";

export interface TypographyParagraphProps extends React.ComponentProps<"p"> {}

export const TypographyParagraph = ({
  className,
  ...props
}: TypographyParagraphProps) => {
  return <p className={cn("leading-6", className)} {...props} />;
};
