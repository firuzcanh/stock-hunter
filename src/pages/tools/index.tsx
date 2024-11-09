import { Layout } from "@/components";
import { Callout, Card, Flex, Text } from "@radix-ui/themes";

import ToolParaphrase from "./_components/ToolParaphrase";
import ToolShuffleKeywords from "./_components/ToolShuffleKeywords";
import { InfoIcon } from "lucide-react";

const ToolsPage: React.FC = () => {
  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>Tools</Layout.Title>
      </Layout.Header>

      <Flex direction="column" gap="6" className="p-6">
        <Callout.Root>
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
