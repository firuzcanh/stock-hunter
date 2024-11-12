import { IconButton } from "@radix-ui/themes";
import { CheckIcon, XIcon } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import { twMerge } from "tailwind-merge";

export type ContentEditProps = {
  value?: string;
  className?: string;
  onSave?: (value: any) => void;
  onCancel?: () => void;
  onChange?: (value: string) => void;
};

export const ContentEdit: React.FC<ContentEditProps> = ({
  value,
  className,
  onSave,
  onCancel,
  onChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prevValue = useRef<string | undefined>(value);

  const getValue = () => ref.current?.textContent;

  const handleSave = () => {
    onSave?.(getValue());
  };

  const handleCancel = () => {
    onCancel?.();

    if (ref.current) {
      ref.current.blur();
      ref.current.textContent = prevValue.current || "";
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.textContent || "");
  };

  return (
    <div className="group relative flex items-end gap-3 w-full">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={twMerge(
          "w-full outline-none rounded-sm ring-accent ring-offset-2 focus-within:ring-2",
          className
        )}
        onChange={handleChange}
        children={value}
        style={{
          wordBreak: "break-all",
        }}
      />

      <div className="gap-1 flex opacity-0 group-focus-within:opacity-100">
        <IconButton variant="solid" color="green" size="1" onClick={handleSave}>
          <CheckIcon size="14" />
        </IconButton>
        <IconButton variant="solid" color="red" size="1" onClick={handleCancel}>
          <XIcon size="14" />
        </IconButton>
      </div>
    </div>
  );
};
