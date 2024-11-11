import { useAppDispatch, useAppSelector } from "@/store";

import { Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import { Panel } from "@/components";
import { ConfigActions } from "@/store/features/configs.slice";

const PanelOptions: React.FC = () => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) => state.configs.options);

  const handleChangeOptions = (key: string, value: any) => {
    dispatch(ConfigActions.setOptions({ [key]: value }));
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Options</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Flex direction="column" align="start" gap="4">
          <Text as="label" size="2" className="flex items-center gap-2">
            <Checkbox
              size="2"
              checked={options.canParaphrase}
              onCheckedChange={(value) =>
                handleChangeOptions("canParaphrase", value)
              }
            />{" "}
            Pharaphrase Title
          </Text>

          <Text as="label" size="2" className="flex items-center gap-2">
            <Checkbox
              size="2"
              checked={options.canShuffle}
              onCheckedChange={(value) =>
                handleChangeOptions("canShuffle", value)
              }
            />{" "}
            Shuffle Keywords
          </Text>

          <TextField.Root
            type="number"
            value={options.shuffleOffset}
            onChange={({ target }) =>
              handleChangeOptions("shuffleOffset", target.value)
            }
            className="w-full"
          >
            <TextField.Slot>Shuffle Offset</TextField.Slot>
          </TextField.Root>
        </Flex>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelOptions;
