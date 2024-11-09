import { forwardRef } from "react";
import { Slot } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

const ListRoot = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ListRoot.displayName = "ListRoot";

const ListGroup = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge("flex flex-col", className)} {...props}>
      {children}
    </div>
  );
});
ListGroup.displayName = "ListGroup";

const ListHeading = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "sticky top-0 bg-panel text-xs text-muted-foreground font-semibold py-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ListHeading.displayName = "ListHeading";

const ListContent = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("flex flex-col gap-0.5", className)}
      {...props}
    >
      {children}
    </div>
  );
});
ListContent.displayName = "ListContent";

const ListItem = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div"> & {
    asChild?: boolean;
    isActive?: boolean;
    isCompleted?: boolean;
  }
>(({ asChild, isActive, isCompleted, className, ...props }, ref) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      ref={ref}
      className={twMerge(
        "relative text-sm p-2 rounded-lg hover:bg-highlight cursor-pointer",
        isActive && "bg-highlight",
        isCompleted && "line-through text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
ListItem.displayName = "ListItem";

const ListItemTitle = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("line-clamp-2", className)}
      style={{ wordBreak: "break-word" }}
      {...props}
    >
      {children}
    </div>
  );
});
ListItemTitle.displayName = "ListItemTitle";

export const List = {
  Root: ListRoot,
  Group: ListGroup,
  Heading: ListHeading,
  Content: ListContent,
  Item: ListItem,
  ItemTitle: ListItemTitle,
};
