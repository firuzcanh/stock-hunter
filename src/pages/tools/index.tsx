import { Layout } from "@/components";
import { Card, Flex, Text } from "@radix-ui/themes";

import ToolParaphrase from "./_components/ToolParaphrase";
import ToolShuffleKeywords from "./_components/ToolShuffleKeywords";

const ToolsPage: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>Tools</Layout.Title>
      </Layout.Header>

      <Flex direction="column" gap="6" className="p-6">
        <Card size="3">
          <Text as="div" size="3" weight="medium" mb="5">
            Shuffle Keywords
          </Text>

          <ToolShuffleKeywords />
        </Card>

        <Card size="3">
          <Text as="div" size="3" weight="medium" mb="5">
            Paraphrase
          </Text>

          <ToolParaphrase />
        </Card>
      </Flex>
    </Layout.Content>
  );
};

export default ToolsPage;
