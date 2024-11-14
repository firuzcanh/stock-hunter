import { useLocation } from "react-router-dom";
import { Link } from "@/router";
import { useAppDispatch, useAppSelector } from "@/store";

import {
  ContentActions,
  ContentSelectors,
} from "@/store/features/content.slice";

import { Badge, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { TrashIcon } from "lucide-react";
import { Confirm, List, Panel } from "@/components";

const PanelContents: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const contentGroups = useAppSelector(ContentSelectors.selectGroupByDate);
  const contentTotal = useAppSelector((state) =>
    ContentSelectors.selectTotal(state.content)
  );

  const handleDeleteAllContents = () => {
    dispatch(ContentActions.removeAll());
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>
          Contents{" "}
          <Badge ml="1" color="red">
            {contentTotal}
          </Badge>
        </Panel.Title>

        <Confirm
          title="Are you sure?"
          description="You'll lost all data after clear them"
          onConfirm={handleDeleteAllContents}
        >
          <IconButton
            size="3"
            color="gray"
            variant="ghost"
            aria-label="Clear contents"
          >
            <Tooltip content="Clear all contents">
              <TrashIcon size="16" />
            </Tooltip>
          </IconButton>
        </Confirm>
      </Panel.Header>

      <Panel.Content>
        {contentTotal ? (
          <List.Root>
            {contentGroups.map((group) => {
              return (
                <List.Group key={group.date}>
                  <List.Heading>{group.date}</List.Heading>

                  {group.contents ? (
                    <List.Content className="-mx-2">
                      {group.contents.map((content) => {
                        const isActive = pathname.includes(content.id);
                        return (
                          <List.Item
                            asChild
                            key={content.id}
                            isCompleted={content.status === "DONE"}
                            isActive={isActive}
                          >
                            <Link
                              to="/contents/:id"
                              params={{ id: content.id }}
                            >
                              <List.ItemTitle>{content.title}</List.ItemTitle>
                            </Link>
                          </List.Item>
                        );
                      })}
                    </List.Content>
                  ) : (
                    <Text size="2" color="gray">
                      No any content found
                    </Text>
                  )}
                </List.Group>
              );
            })}
          </List.Root>
        ) : (
          <Text size="2" color="gray">
            There's no any content found.
          </Text>
        )}
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelContents;
