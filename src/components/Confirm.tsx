import { AlertDialog, Button, Flex } from "@radix-ui/themes";

interface ConfirmProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Confirm: React.FC<ConfirmProps> = ({
  children,
  title = "Are you sure?",
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  open,
  onOpenChange,
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>

      <AlertDialog.Content className="max-w-md">
        <AlertDialog.Title>{title}</AlertDialog.Title>

        {description && (
          <AlertDialog.Description size="2">
            {description}
          </AlertDialog.Description>
        )}

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel onClick={onCancel}>
            <Button variant="soft" color="gray">
              {cancelText}
            </Button>
          </AlertDialog.Cancel>

          <AlertDialog.Action onClick={onConfirm}>
            <Button variant="solid" color="red">
              {confirmText}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
