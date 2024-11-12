import { forwardRef } from "react";
import { Slot } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

export const Marker = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ asChild, className, children, ...props }, ref) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={twMerge(
        "inline-flex items-center gap-2.5 rounded-sm",
        "ring-background hover:bg-background hover:ring-4",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});
Marker.displayName = "Marker";
