import { cn } from "~/utils"

export interface BadgeProps extends React.ComponentProps<"span"> {

}

export const Badge = ({ className, ...props }: BadgeProps) => {
  return (
    <span
      {...props}
      className={cn("bg-black/50 rounded-full flex items-center gap-0.5 px-1.5", className)}
    />
  )
}
