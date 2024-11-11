import {
  Button,
  Card,
  Flex,
  Grid,
  IconButton,
  Select,
  Text,
  TextArea,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { LockIcon, PlusIcon, XIcon } from "lucide-react";

const FormArea: React.FC = () => {
  return (
    <Card size="3">
      <Text as="div" size="2" weight="medium" mb="4">
        Enter your keyword, title or prompt
      </Text>

      {/* Create Prompts */}
      <Flex direction="column" gap="3">
        <Grid columns="3" gap="3">
          <TextField.Root placeholder="Enter title here" className="group">
            <TextField.Slot
              side="right"
              gap="2"
              className="hidden group-hover:flex"
            >
              <IconButton
                size="1"
                color="gray"
                variant="surface"
                aria-label="Lock"
              >
                <LockIcon size="14" />
              </IconButton>

              <IconButton
                size="1"
                color="red"
                variant="solid"
                aria-label="Remove"
              >
                <XIcon size="14" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>

          <Flex align="center" gap="4">
            {/* Add new */}
            <Tooltip content="Add new input">
              <IconButton
                color="gray"
                variant="surface"
                aria-label="Add new input"
              >
                <PlusIcon size="16" />
              </IconButton>
            </Tooltip>
          </Flex>
        </Grid>

        <Flex>
          <Button>Create prompts</Button>
        </Flex>
      </Flex>

      {/* Submit */}
      <Flex direction="column" gap="4" mt="4">
        <TextArea rows={12} />

        <Flex align="center" gap="3">
          <Select.Root>
            <Select.Trigger placeholder="Category" />

            <Select.Content>
              <Select.Item value="1">Animals</Select.Item>
            </Select.Content>
          </Select.Root>

          <Button>Confirm and Submit</Button>
        </Flex>
      </Flex>
    </Card>
  );
};

export default FormArea;
