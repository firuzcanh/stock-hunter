import type { AIMergedModel, AIProvider } from "@/types/ai.type";

import { useAppDispatch, useAppSelector } from "@/store";
import { ConfigActions } from "@/store/features/configs.slice";

import { Flex, Grid, Select, TextField } from "@radix-ui/themes";
import { Panel } from "@/components";

import { AI_MODELS, AI_PROVIDERS } from "@/constants/data";

const PanelAIProvider: React.FC = () => {
  const dispatch = useAppDispatch();
  const aiConfigs = useAppSelector((state) => state.configs.ai);

  const handleChangeProvider = (value: AIProvider) => {
    dispatch(ConfigActions.setAIProvider(value));
  };

  const handleChangeModel = (value: AIMergedModel) => {
    dispatch(ConfigActions.setAIModel(value));
  };

  const handleChangeApiKey = (value: string) => {
    dispatch(ConfigActions.setAIApiKey(value));
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>AI Provider & Model</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Flex direction="column" gap="3">
          <Grid columns="2" gap="3">
            <Select.Root
              value={aiConfigs.provider}
              onValueChange={handleChangeProvider}
            >
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

            <Select.Root
              value={aiConfigs.model}
              onValueChange={handleChangeModel}
            >
              <Select.Trigger
                placeholder="Choose Platform"
                className="w-full"
              />

              <Select.Content>
                {AI_MODELS[aiConfigs.provider]?.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Grid>

          <TextField.Root
            placeholder="Enter a token here"
            size="3"
            value={aiConfigs.apiKey || ""}
            onChange={(e) => handleChangeApiKey(e.target.value)}
          />
        </Flex>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelAIProvider;
