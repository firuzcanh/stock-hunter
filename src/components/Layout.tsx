import { forwardRef } from "react";
import { ScrollArea } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

const LayoutRoot = forwardRef<
  React.ComponentRef<"section">,
  React.ComponentProps<"section">
>(({ children, className, ...props }, ref) => {
  return (
    <section
      ref={ref}
      className={twMerge("flex w-full min-h-screen bg-background", className)}
      {...props}
    >
      {children}
    </section>
  );
});
LayoutRoot.displayName = "LayoutRoot";

const LayoutSidebar = forwardRef<
  React.ComponentRef<typeof ScrollArea>,
  React.ComponentProps<typeof ScrollArea>
>(({ children, className, ...props }, ref) => {
  return (
    <ScrollArea
      ref={ref}
      className={twMerge(
        "!sticky top-0 h-screen w-[326px] bg-panel text-panel-foreground",
        className
      )}
      {...props}
    >
      {children}
    </ScrollArea>
  );
});
LayoutSidebar.displayName = "LayoutSidebar";

const LayoutContent = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex-1 flex flex-col bg-background text-foreground border-x border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
LayoutContent.displayName = "LayoutContent";

const LayoutHeader = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex items-center sticky z-[1] top-0 h-[60px] px-6 bg-panel text-panel-foreground border-b border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
LayoutHeader.displayName = "LayoutHeader";

const LayoutHeaderSlot = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div"> & { side?: "left" | "right" }
>(({ children, side, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "flex items-center gap-2",
        side === "right" && "flex-1 justify-end",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
LayoutHeader.displayName = "LayoutHeader";

const LayoutTitle = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge("font-semibold text-base", className)}
      {...props}
    >
      {children}
    </div>
  );
});
LayoutTitle.displayName = "LayoutTitle";

export const Layout = {
  Root: LayoutRoot,
  Sidebar: LayoutSidebar,
  Content: LayoutContent,
  Header: LayoutHeader,
  HeaderSlot: LayoutHeaderSlot,
  Title: LayoutTitle,
};
