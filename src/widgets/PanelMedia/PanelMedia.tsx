import { Panel } from "@/components";
import { Link } from "@/router";
import { Button } from "@radix-ui/themes";
import { DownloadIcon } from "lucide-react";

const PanelMedia: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Media</Panel.Title>

        <Button asChild size="1">
          <Link to="/media">
            <DownloadIcon size="14" strokeWidth={2} />
            Import
          </Link>
        </Button>
      </Panel.Header>
    </Panel.Root>
  );
};

export default PanelMedia;
