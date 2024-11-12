import { forwardRef } from "react";
import { Slot, Text } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

const DetailCardRoot = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "relative group flex flex-col gap-2 p-5 rounded-lg hover:bg-highlight",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
DetailCardRoot.displayName = "DetailCardRoot";

const DetailCardLabel = forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentProps<typeof Text>
>(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} as="div" className="text-sm font-semibold" {...props}>
      {children}
    </Text>
  );
});
DetailCardLabel.displayName = "DetailCardLabel";

const DetailCardText = forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentProps<typeof Text>
>(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} as="div" className="text-sm" {...props}>
      {children}
    </Text>
  );
});
DetailCardText.displayName = "DetailCardText";

const DetailCardSlot = forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentProps<typeof Slot>
>(({ children, ...props }, ref) => {
  return (
    <Slot ref={ref} {...props}>
      {children}
    </Slot>
  );
});
DetailCardSlot.displayName = "DetailCardSlot";

export const DetailCard = {
  Root: DetailCardRoot,
  Label: DetailCardLabel,
  Text: DetailCardText,
  Slot: DetailCardSlot,
};
