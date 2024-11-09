import { Select } from "@radix-ui/themes";
import { Panel } from "@/components";
import { PLATFORMS } from "@/constants/data";

const PanelPlatform: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Platform</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <Select.Root size="3" defaultValue={PLATFORMS[0].value}>
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
