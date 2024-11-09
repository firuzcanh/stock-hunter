import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

const EmptyRoot = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex items-center justify-center flex-col text-center py-3 gap-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
EmptyRoot.displayName = "EmptyRoot";

const EmptyTitle = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge("font-semibold", className)} {...props}>
      {children}
    </div>
  );
});
EmptyTitle.displayName = "EmptyTitle";

const EmptyDescription = forwardRef<
  React.ComponentRef<"p">,
  React.ComponentProps<"p">
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={twMerge("text-muted-foreground max-w-[60%]", className)}
      {...props}
    >
      {children}
    </p>
  );
});
EmptyDescription.displayName = "EmptyDescription";

const EmptyIcon = forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentProps<typeof Slot>
>(({ className, children, ...props }, ref) => {
  return (
    <Slot
      ref={ref}
      className={twMerge("w-32 h-auto text-accent mb-10", className)}
      {...props}
    >
      {children}
    </Slot>
  );
});
EmptyIcon.displayName = "EmptyIcon";

export const Empty = {
  Root: EmptyRoot,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Icon: EmptyIcon,
};
