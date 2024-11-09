import { Box, Flex, Text } from "@radix-ui/themes";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const PanelRoot = forwardRef<
  React.ComponentRef<typeof Flex>,
  React.ComponentProps<typeof Flex>
>(({ className, children, ...props }, ref) => {
  return (
    <Flex
      ref={ref}
      direction="column"
      className={twMerge("gap-4 p-4", className)}
      {...props}
    >
      {children}
    </Flex>
  );
});
PanelRoot.displayName = "PanelRoot";

const PanelHeader = forwardRef<
  React.ComponentRef<typeof Flex>,
  React.ComponentProps<typeof Flex>
>(({ children, ...props }, ref) => {
  return (
    <Flex ref={ref} align="center" justify="between" gap="4" {...props}>
      {children}
    </Flex>
  );
});
PanelHeader.displayName = "PanelHeader";

const PanelTitle = forwardRef<
  React.ComponentRef<typeof Text>,
  React.ComponentProps<typeof Text>
>(({ className, children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      className={twMerge("font-semibold text-sm", className)}
      {...props}
    >
      {children}
    </Text>
  );
});
PanelTitle.displayName = "PanelTitle";

const PanelContent = forwardRef<
  React.ComponentRef<typeof Box>,
  React.ComponentProps<typeof Box>
>(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});
PanelContent.displayName = "PanelContent";

export const Panel = {
  Root: PanelRoot,
  Header: PanelHeader,
  Title: PanelTitle,
  Content: PanelContent,
};
