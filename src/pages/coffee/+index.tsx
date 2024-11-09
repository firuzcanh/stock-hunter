import { useModals } from "@/router";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import qrCodeImage from "@/assets/images/firuzcan_qrcode.png";

const Coffee: React.FC = () => {
  const modals = useModals();

  return (
    <Dialog.Root open onOpenChange={() => modals.close()}>
      <Dialog.Content size="4">
        <Dialog.Title>Buy Coffee</Dialog.Title>

        <div>
          <Text as="p">You can support me by buying coffee.</Text>
          <Text as="p">
            Scan QR code or{" "}
            <a
              href="https://kofe.al/@firuzcan"
              target="_blank"
              className="underline hover:text-accent"
            >
              click the link
            </a>
            . Thank you for your support.
          </Text>

          <div className="max-w-[70%] w-full mx-auto aspect-square my-10">
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="w-full h-full object-cover"
            />
          </div>

          <Flex justify="center">
            <Dialog.Close>
              <Button color="gray" variant="surface">
                Close
              </Button>
            </Dialog.Close>
          </Flex>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Coffee;
