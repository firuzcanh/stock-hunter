import { useAppDispatch, useAppSelector } from "@/store";

import { Select } from "@radix-ui/themes";
import { Panel } from "@/components";

import { PLATFORMS } from "@/constants/data";
import { ConfigActions } from "@/store/features/configs.slice";

const PanelPlatform: React.FC = () => {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => state.configs.platform);

  const handleChangePlatform = (value: string) => {
    dispatch(ConfigActions.setPlatform(value));
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Platform</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Select.Root
          size="3"
          defaultValue={platform}
          onValueChange={handleChangePlatform}
        >
          <Select.Trigger placeholder="Choose Platform" className="w-full" />

          <Select.Content>
            {PLATFORMS.map((platform) => (
              <Select.Item key={platform.value} value={platform.value}>
                {platform.label}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelPlatform;
