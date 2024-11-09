import { List, Panel } from "@/components";
import { Badge, IconButton, Tooltip } from "@radix-ui/themes";
import { TrashIcon } from "lucide-react";

const PanelContents: React.FC = () => {
  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>
          Contents{" "}
          <Badge ml="1" color="red">
            3
          </Badge>
        </Panel.Title>

        <Tooltip content="Clear all contents">
          <IconButton
            size="3"
            color="gray"
            variant="ghost"
            aria-label="Clear contents"
          >
            <TrashIcon size="16" />
          </IconButton>
        </Tooltip>
      </Panel.Header>

      <Panel.Content>
        <List.Root>
          <List.Group>
            <List.Heading>08 Nov 2024</List.Heading>

            <List.Content className="-mx-2">
              <List.Item isCompleted>
                <List.ItemTitle>
                  Woman holding several credit cards and he is choosing a credit
                  card to pay and spend Payment for goods via credit card.
                  Finance and banking concept.
                </List.ItemTitle>
              </List.Item>

              <List.Item>
                <List.ItemTitle>
                  Woman holding several credit cards and he is choosing a credit
                  card to pay and spend Payment for goods via credit card.
                  Finance and banking concept.
                </List.ItemTitle>
              </List.Item>
            </List.Content>
          </List.Group>

          <List.Group>
            <List.Heading>08 Nov 2024</List.Heading>

            <List.Content className="-mx-2">
              <List.Item>
                <List.ItemTitle>
                  Woman holding several credit cards and he is choosing a credit
                  card to pay and spend Payment for goods via credit card.
                  Finance and banking concept.
                </List.ItemTitle>
              </List.Item>

              <List.Item>
                <List.ItemTitle>
                  Woman holding several credit cards and he is choosing a credit
                  card to pay and spend Payment for goods via credit card.
                  Finance and banking concept.
                </List.ItemTitle>
              </List.Item>
            </List.Content>
          </List.Group>
        </List.Root>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelContents;
