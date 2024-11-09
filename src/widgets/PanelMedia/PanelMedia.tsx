import { Panel } from "@/components";
import { Button } from "@radix-ui/themes";
import { DownloadIcon } from "lucide-react";

const PanelMedia: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Media</Panel.Title>

        <Button size="1">
          <DownloadIcon size="14" strokeWidth={2} />
          Import
        </Button>
      </Panel.Header>
    </Panel.Root>
  );
};

export default PanelMedia;
