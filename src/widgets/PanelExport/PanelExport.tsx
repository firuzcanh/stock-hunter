import { Button, Text } from "@radix-ui/themes";
import { Panel } from "@/components";

const PanelExport: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Export</Panel.Title>
      </Panel.Header>

      <Panel.Content>
        <div className="mb-2">
          <Text as="p" size="1" className="text-muted-foreground">
            You can select spesific assets to export or you can leave it to
            export all
          </Text>
        </div>

        <Button size="3" color="green" className="w-full">
          Export XLSX (0/0)
        </Button>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelExport;
