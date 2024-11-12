import { forwardRef, useState } from "react";

import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";

import { IconButton, IconButtonProps, Slot } from "@radix-ui/themes";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";

export type CopyButtonProps = Pick<
  IconButtonProps,
  "size" | "variant" | "color"
> & {
  value: string | number;
  className?: string;
};

export type CopyPanelProps = CopyButtonProps & {
  children: React.ReactNode;
};

export const CopyButton = forwardRef<
  React.ComponentRef<typeof IconButton>,
  CopyButtonProps
>(({ value, ...props }, ref) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));
    setCopied(true);

    toast.dismiss();
    toast.success("Copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <IconButton
      ref={ref}
      type="button"
      color="gray"
      variant="soft"
      title="Copy"
      aria-label="Copy"
      onClick={handleCopy}
      {...props}
    >
      {!copied ? <ClipboardIcon size="16" /> : <ClipboardCheckIcon size="16" />}
    </IconButton>
  );
});

export const CopyPanel: React.FC<CopyPanelProps> = ({
  value,
  className,
  children,
  ...props
}) => {
  return (
    <div className={twMerge("group relative", className)}>
      {children}

      <CopyButton
        value={value}
        className="opacity-0 group-hover:opacity-100 absolute top-1 right-1 z-[1]"
        {...props}
      />
    </div>
  );
};

export const CopySlot = forwardRef<
  React.ComponentRef<typeof Slot>,
  React.ComponentProps<typeof Slot> & { value: any }
>(({ value, children, ...props }, ref) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(String(value));

    toast.dismiss();
    toast.success("Copied!");
  };

  return (
    <Slot ref={ref} onClick={handleCopy} {...props}>
      {children}
    </Slot>
  );
});

export const Copy = {
  Button: CopyButton,
  Panel: CopyPanel,
  Slot: CopySlot,
};
