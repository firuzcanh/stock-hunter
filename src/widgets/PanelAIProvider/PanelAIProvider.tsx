import { Flex, Grid, Select, TextField } from "@radix-ui/themes";
import { Panel } from "@/components";
import { AI_MODELS, AI_PROVIDERS } from "@/constants/data";

const PanelAIProvider: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>AI Provider & Model</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Flex direction="column" gap="3">
          <Grid columns="2" gap="3">
            <Select.Root defaultValue={AI_PROVIDERS[0].value}>
              <Select.Trigger
                placeholder="Choose Platform"
                className="w-full"
              />

              <Select.Content>
                {AI_PROVIDERS.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>

            <Select.Root defaultValue={AI_MODELS.gemini[0].value}>
              <Select.Trigger
                placeholder="Choose Platform"
                className="w-full"
              />

              <Select.Content>
                {AI_MODELS.gemini.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Grid>

          <TextField.Root placeholder="Enter a token here" size="3" />
        </Flex>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelAIProvider;
