import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useModals } from "@/router";
import { useAppSelector } from "@/store";
import { ContentSelectors } from "@/store/features/content.slice";
import { FolderSelectors } from "@/store/features/folder.slice";

import { Badge, Button, IconButton, Text, Tooltip } from "@radix-ui/themes";
import { EraserIcon, LayoutGridIcon, ListIcon } from "lucide-react";
import { Empty, Layout } from "@/components";
import { SvgSetupWizard } from "@/components/illustrations";
import { twMerge } from "tailwind-merge";

import { CONTENT_STATUSES } from "@/constants/data";
import { useContentDrawer } from "./_components/drawer-context";

type ViewMode = "grid" | "list";

const ContentsPage: React.FC = () => {
  const modals = useModals();
  const { selectedId, open } = useContentDrawer();

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const activeFolderId = useAppSelector(FolderSelectors.selectActiveFolderId);
  const activeFolder = useAppSelector((state) =>
    activeFolderId ? FolderSelectors.selectById(state, activeFolderId) : null
  );
  const contents = useAppSelector((state) =>
    ContentSelectors.selectAll(state.content)
  );

  const items = useMemo(
    () => contents.filter((content) => (content.folderId || null) === activeFolderId),
    [contents, activeFolderId]
  );

  const folderName = activeFolder?.name || "Unfiled";
  const hasItems = items.length > 0;

  const renderStatus = (status: keyof typeof CONTENT_STATUSES) => {
    const config = CONTENT_STATUSES[status] || CONTENT_STATUSES.TODO;
    return (
      <Badge color={config.color as any} size="1">
        {config.label}
      </Badge>
    );
  };

  return (
    <Layout.Content>
      <Layout.Header>
        <Layout.Title>
          {folderName}
          <Badge ml="2" color="gray">
            {items.length}
          </Badge>
        </Layout.Title>

        <Layout.HeaderSlot side="right">
          <div className="flex items-center gap-1 mr-2">
            <IconButton
              size="1"
              color="gray"
              variant={viewMode === "grid" ? "solid" : "soft"}
              aria-label="Grid view"
              onClick={() => setViewMode("grid")}
            >
              <Tooltip content="Grid view">
                <LayoutGridIcon size="16" />
              </Tooltip>
            </IconButton>
            <IconButton
              size="1"
              color="gray"
              variant={viewMode === "list" ? "solid" : "soft"}
              aria-label="List view"
              onClick={() => setViewMode("list")}
            >
              <Tooltip content="List view">
                <ListIcon size="16" />
              </Tooltip>
            </IconButton>
          </div>

          <Button
            size="1"
            color="red"
            onClick={() => modals.open("/modals/reset")}
          >
            <EraserIcon size="14" />
            Hard Reset
          </Button>
        </Layout.HeaderSlot>
      </Layout.Header>

      {hasItems ? (
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {items.map((content) => (
                <button
                  key={content.id}
                  onClick={() => open(content.id)}
                  className={twMerge(
                    "group text-left rounded-m3-lg border border-border overflow-hidden bg-panel shadow-m3-1 hover:shadow-m3-2 hover:-translate-y-0.5 transition-all duration-200",
                    selectedId === content.id && "ring-2 ring-accent-8 border-transparent"
                  )}
                >
                  <div className="aspect-square bg-highlight overflow-hidden">
                    <img
                      src={content.src}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-3">
                    <Text size="2" className="line-clamp-2 font-medium">
                      {content.title}
                    </Text>
                    {renderStatus(content.status)}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border rounded-m3-lg border border-border bg-panel shadow-m3-1 overflow-hidden">
              {items.map((content) => (
                <button
                  key={content.id}
                  onClick={() => open(content.id)}
                  className={twMerge(
                    "flex items-center gap-3 p-3 text-left hover:bg-highlight transition-colors",
                    selectedId === content.id && "bg-highlight"
                  )}
                >
                  <img
                    src={content.src}
                    alt={content.title}
                    className="w-14 h-14 rounded-m3-md object-cover border border-border shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Text size="2" className="line-clamp-1 font-medium">
                      {content.title}
                    </Text>
                    <Text size="1" color="gray">
                      Stock ID: {content.stockId}
                    </Text>
                  </div>
                  {renderStatus(content.status)}
                  <Text size="1" color="gray" className="shrink-0">
                    {content.createdAt
                      ? format(content.createdAt, "dd MMM yyyy")
                      : "-"}
                  </Text>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center container max-w-screen-sm mb-10">
          <Empty.Root>
            <Empty.Icon children={<SvgSetupWizard />} />
            <Empty.Title>No items in {folderName}</Empty.Title>
            <Empty.Description>
              Generate content while this folder is active, or move existing
              items here from another folder.
            </Empty.Description>
          </Empty.Root>
        </div>
      )}
    </Layout.Content>
  );
};

export default ContentsPage;
