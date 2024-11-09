import { Panel } from "@/components";
import { Checkbox, Flex, Text, TextField } from "@radix-ui/themes";

const PanelOptions: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Options</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Flex direction="column" align="start" gap="3">
          <Text as="label" size="2" className="flex items-center gap-2">
            <Checkbox size="2" defaultChecked /> Pharaphrase Title
          </Text>

          <Text as="label" size="2" className="flex items-center gap-2">
            <Checkbox size="2" defaultChecked /> Shuffle Keywords
          </Text>

          <TextField.Root type="number" defaultValue={8}>
            <TextField.Slot>Shuffle Offset</TextField.Slot>
          </TextField.Root>
        </Flex>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelOptions;
