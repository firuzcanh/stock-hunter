import { Button, DataList, Flex, Separator, TextArea } from "@radix-ui/themes";

const ToolParaphrase: React.FC = () => {
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" align="start" gap="3">
        <TextArea placeholder="Enter title here" className="w-full" />
        <Button>Paraphrase</Button>
      </Flex>

      <Separator size="4" />

      <DataList.Root>
        <DataList.Item>
          <DataList.Label>
            This is just a random string of letters. I can't make sense of it.
          </DataList.Label>
        </DataList.Item>
      </DataList.Root>
    </Flex>
  );
};

export default ToolParaphrase;
