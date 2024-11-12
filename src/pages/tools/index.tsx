import { Callout, Card, Flex, Text } from "@radix-ui/themes";
import { InfoIcon } from "lucide-react";
import { Layout } from "@/components";

import ToolParaphrase from "./_components/ToolParaphrase";
import ToolShuffleKeywords from "./_components/ToolShuffleKeywords";

const ToolsPage: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>Tools</Layout.Title>
      </Layout.Header>

      <Flex direction="column" gap="6" className="p-6">
        <Callout.Root variant="surface">
          <Callout.Icon>
            <InfoIcon size="16" />
          </Callout.Icon>
          <Callout.Text>
            These are useful tools for creating paraphrased text or mixing
            keywords.
          </Callout.Text>
        </Callout.Root>

        <Card size="3">
          <Text as="div" size="2" weight="medium" mb="4">
            Shuffle Keywords
          </Text>

          <ToolShuffleKeywords />
        </Card>

        <Card size="3">
          <Text as="div" size="2" weight="medium" mb="4">
            Paraphrase
          </Text>

          <ToolParaphrase />
        </Card>
      </Flex>
    </Layout.Content>
  );
};

export default ToolsPage;
