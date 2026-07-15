import type { ContentStatusType } from "@/types/content.type";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/store";
import { ConfigActions } from "@/store/features/configs.slice";
import { ContentActions, ContentSelectors } from "@/store/features/content.slice";
import { FolderSelectors } from "@/store/features/folder.slice";

import {
  Badge,
  Checkbox,
  DropdownMenu,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import {
  ChevronDownIcon,
  Columns3Icon,
  FolderInputIcon,
  LayoutGridIcon,
  ListIcon,
  TagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { Confirm, Empty, Layout } from "@/components";
import { SvgSetupWizard } from "@/components/illustrations";
import { twMerge } from "tailwind-merge";

import { CONTENT_STATUSES } from "@/constants/data";
import { useContentDrawer } from "./_components/drawer-context";

const UNFILED = "__unfiled__";
const COLUMN_OPTIONS = [3, 4, 5, 6, 7, 8];

const ContentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedId, open } = useContentDrawer();

  const viewMode = useAppSelector(
    (state) => state.configs.contents?.viewMode ?? "grid"
  );
  const columns = useAppSelector(
    (state) => state.configs.contents?.gridColumns ?? 5
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const activeFolderId = useAppSelector(FolderSelectors.selectActiveFolderId);
  const activeFolder = useAppSelector((state) =>
    activeFolderId ? FolderSelectors.selectById(state, activeFolderId) : null
  );
  const folders = useAppSelector(FolderSelectors.selectAll);
  const contents = useAppSelector((state) =>
    ContentSelectors.selectAll(state.content)
  );

  const items = useMemo(
    () =>
      contents.filter(
        (content) => (content.folderId || null) === activeFolderId
      ),
    [contents, activeFolderId]
  );

  const folderName = activeFolder?.name || "Unfiled";
  const hasItems = items.length > 0;

  // Card corner radius scales down as the grid gets denser, so small cards
  // don't look over-rounded at 7–8 columns.
  const cardRadiusClass =
    columns <= 3
      ? "rounded-m3-xl"
      : columns <= 5
      ? "rounded-m3-lg"
      : columns <= 7
      ? "rounded-m3-md"
      : "rounded-m3-sm";

  const selectedCount = selected.size;
  const allSelected = hasItems && items.every((item) => selected.has(item.id));
  const someSelected = selectedCount > 0 && !allSelected;

  const clearSelection = () => setSelected(new Set());

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allSelected || someSelected) {
      clearSelection();
    } else {
      setSelected(new Set(items.map((item) => item.id)));
    }
  };

  const handleOpen = (id: string, copyValue: string) => {
    navigator.clipboard.writeText(copyValue);
    toast.dismiss();
    toast.success("ID & title copied");
    open(id);
  };

  const selectedIds = () => Array.from(selected);

  const handleBulkDelete = () => {
    dispatch(ContentActions.removeMany(selectedIds()));
    clearSelection();
  };

  const handleBulkStatus = (status: ContentStatusType) => {
    dispatch(
      ContentActions.updateMany(selectedIds().map((id) => ({ id, status })))
    );
    clearSelection();
  };

  const handleBulkMove = (value: string) => {
    const folderId = value === UNFILED ? null : value;
    dispatch(
      ContentActions.updateMany(selectedIds().map((id) => ({ id, folderId })))
    );
    clearSelection();
  };

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
        {hasItems ? (
          <Checkbox
            mr="3"
            checked={allSelected ? true : someSelected ? "indeterminate" : false}
            onClick={toggleSelectAll}
            aria-label="Select all"
          />
        ) : null}

        <Layout.Title>
          {selectedCount > 0 ? (
            `${selectedCount} selected`
          ) : (
            <>
              {folderName}
              <Badge ml="2" color="gray">
                {items.length}
              </Badge>
            </>
          )}
        </Layout.Title>

        <Layout.HeaderSlot side="right">
          {selectedCount > 0 ? (
            <div className="inline-flex items-center gap-0.5 rounded-full bg-muted p-1">
              {/* Move */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton size="2" color="gray" variant="ghost" aria-label="Move">
                    <Tooltip content="Move to folder">
                      <FolderInputIcon size="17" />
                    </Tooltip>
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>Move to</DropdownMenu.Label>
                  <DropdownMenu.Item onSelect={() => handleBulkMove(UNFILED)}>
                    Unfiled
                  </DropdownMenu.Item>
                  {folders.map((folder) => (
                    <DropdownMenu.Item
                      key={folder.id}
                      onSelect={() => handleBulkMove(folder.id)}
                    >
                      {folder.name}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              {/* Status */}
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton size="2" color="gray" variant="ghost" aria-label="Status">
                    <Tooltip content="Set status">
                      <TagIcon size="17" />
                    </Tooltip>
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>Set status</DropdownMenu.Label>
                  {Object.values(CONTENT_STATUSES).map((status) => (
                    <DropdownMenu.Item
                      key={status.value}
                      onSelect={() =>
                        handleBulkStatus(status.value as ContentStatusType)
                      }
                    >
                      {status.label}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>

              {/* Delete */}
              <Confirm
                title="Delete selected?"
                description={`${selectedCount} item(s) will be permanently removed.`}
                onConfirm={handleBulkDelete}
              >
                <IconButton size="2" color="red" variant="ghost" aria-label="Delete">
                  <Tooltip content="Delete">
                    <Trash2Icon size="17" />
                  </Tooltip>
                </IconButton>
              </Confirm>

              <IconButton
                size="2"
                color="gray"
                variant="ghost"
                aria-label="Clear selection"
                onClick={clearSelection}
              >
                <Tooltip content="Clear selection">
                  <XIcon size="18" />
                </Tooltip>
              </IconButton>
            </div>
          ) : null}

          {/* View switcher — M3 Expressive segmented control */}
          <div className="inline-flex items-center rounded-full bg-muted p-1">
            {(
              [
                { mode: "grid", Icon: LayoutGridIcon, label: "Grid view" },
                { mode: "list", Icon: ListIcon, label: "List view" },
              ] as const
            ).map(({ mode, Icon, label }) => {
              const active = viewMode === mode;
              return (
                <Tooltip key={mode} content={label}>
                  <button
                    aria-label={label}
                    aria-pressed={active}
                    onClick={() =>
                      dispatch(ConfigActions.setContentsViewMode(mode))
                    }
                    className={twMerge(
                      "grid place-items-center h-8 w-9 rounded-full transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-8)]",
                      active
                        ? "bg-panel text-foreground shadow-m3-1"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon size="17" />
                  </button>
                </Tooltip>
              );
            })}
          </div>

          {/* Grid columns — M3 tonal button */}
          {viewMode === "grid" ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button
                  aria-label="Grid columns"
                  title="Grid columns"
                  className="inline-flex items-center gap-1.5 h-10 pl-3.5 pr-3 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-highlight transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent-8)]"
                >
                  <Columns3Icon size="16" />
                  <span className="text-sm font-semibold tabular-nums text-foreground">
                    {columns}
                  </span>
                  <ChevronDownIcon size="15" className="opacity-50" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>Columns</DropdownMenu.Label>
                <DropdownMenu.RadioGroup
                  value={String(columns)}
                  onValueChange={(value) =>
                    dispatch(ConfigActions.setContentsGridColumns(Number(value)))
                  }
                >
                  {COLUMN_OPTIONS.map((count) => (
                    <DropdownMenu.RadioItem key={count} value={String(count)}>
                      {count} columns
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : null}
        </Layout.HeaderSlot>
      </Layout.Header>

      {hasItems ? (
        <div className="flex-1 overflow-y-auto p-6 animate-fade-in">
          {viewMode === "grid" ? (
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {items.map((content) => {
                const isSelected = selected.has(content.id);
                return (
                  <div
                    key={content.id}
                    onClick={() =>
                      handleOpen(
                        content.id,
                        `${content.titleParaphrased} ID_${content.id}`
                      )
                    }
                    className={twMerge(
                      "group relative text-left overflow-hidden bg-panel shadow-m3-1 hover:shadow-m3-2 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer",
                      cardRadiusClass,
                      (selectedId === content.id || isSelected) &&
                        "ring-2 ring-accent-8"
                    )}
                  >
                    <div
                      className={twMerge(
                        "absolute top-2 left-2 z-[1] transition-opacity",
                        isSelected
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isSelected}
                        onClick={() => toggleSelect(content.id)}
                        aria-label="Select"
                        className="bg-panel rounded"
                      />
                    </div>

                    <div className="aspect-square bg-highlight overflow-hidden">
                      <img
                        src={content.src}
                        alt={content.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-start gap-2 p-3">
                      <Text size="2" className="line-clamp-2 font-medium">
                        {content.title}
                      </Text>
                      {renderStatus(content.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-divider rounded-m3-xl bg-panel shadow-m3-1 overflow-hidden">
              {items.map((content) => {
                const isSelected = selected.has(content.id);
                return (
                  <div
                    key={content.id}
                    onClick={() =>
                      handleOpen(
                        content.id,
                        `${content.titleParaphrased} ID_${content.id}`
                      )
                    }
                    className={twMerge(
                      "flex items-center gap-3 p-3 text-left hover:bg-highlight transition-colors cursor-pointer",
                      (selectedId === content.id || isSelected) && "bg-highlight"
                    )}
                  >
                    <div onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onClick={() => toggleSelect(content.id)}
                        aria-label="Select"
                      />
                    </div>

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
                  </div>
                );
              })}
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
