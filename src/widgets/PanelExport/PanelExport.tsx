import * as xlsx from "xlsx";

import { useAppSelector } from "@/store";
import { MediaSelectors } from "@/store/features/media.slice";
import { ContentSelectors } from "@/store/features/content.slice";

import { Button, Text } from "@radix-ui/themes";
import { Panel } from "@/components";

const PanelExport: React.FC = () => {
  const contents = useAppSelector((state) =>
    ContentSelectors.selectEntities(state.content)
  );
  const { matched } = useAppSelector(MediaSelectors.selectMatchedsWithContents);

  const matchedSize = matched?.length || 0;

  const getDataToExport = () => {
    return matched
      .filter((media) => contents[media.contentId!])
      .map((media) => {
        const content = contents[media.contentId!];
        return {
          Filename: media.file.name,
          Title: content.title,
          Keywords: content.keywords?.join(", ") || "",
        };
      });
  };

  const handleExport = () => {
    // Create a new XLSX workbook
    const workbook = xlsx.utils.book_new();
    // Convert data to a sheet
    const worksheet = xlsx.utils.json_to_sheet(getDataToExport());

    // Add the sheet to the workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, "data");

    // Generate buffer (pre step for actual file writing)
    xlsx.write(workbook, {
      bookType: "xlsx",
      type: "buffer",
    });

    // Write the buffer to a file
    xlsx.writeFile(workbook, "stock-data.csv");
  };

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

        <Button
          size="3"
          color="green"
          className="w-full"
          onClick={handleExport}
        >
          Export XLSX ({matchedSize}/{matchedSize})
        </Button>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelExport;
