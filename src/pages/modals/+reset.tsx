import { Empty } from "@/components";
import { SvgTrash } from "@/components/illustrations";
import { useModals } from "@/router";
import { Button, Dialog, Flex } from "@radix-ui/themes";

const ResetModal: React.FC = () => {
  const modals = useModals();

  const handleReset = () => {};

  return (
    <Dialog.Root open onOpenChange={() => modals.close()}>
      <Dialog.Content size="4">
        <Dialog.Title>Hard Reset</Dialog.Title>

        <Empty.Root>
          <Empty.Icon children={<SvgTrash className="text-accent" />} />
          <Empty.Title>Are you sure?</Empty.Title>
          <Empty.Description>
            This action will remove all contents, options and other saved all
            things.
          </Empty.Description>
        </Empty.Root>

        <Flex align="center" justify="center" gap="3" mt="4">
          <Dialog.Close>
            <Button color="gray" variant="surface">
              Close
            </Button>
          </Dialog.Close>

          <Button color="red" onClick={handleReset}>
            Confirm and Reset
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ResetModal;
