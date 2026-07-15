import type { FolderType } from "@/types/folder.type";

import { useMemo, useState } from "react";
import { v4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/store";
import { ContentActions, ContentSelectors } from "@/store/features/content.slice";
import { FolderActions, FolderSelectors } from "@/store/features/folder.slice";

import {
  AlertDialog,
  Badge,
  Button,
  DropdownMenu,
  Flex,
  IconButton,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import {
  CheckIcon,
  FolderIcon,
  FolderPlusIcon,
  InboxIcon,
  MoreVerticalIcon,
  XIcon,
} from "lucide-react";
import { Panel } from "@/components";
import { twMerge } from "tailwind-merge";

const rowClass =
  "group/row flex items-center gap-2.5 px-3 py-2.5 rounded-full cursor-pointer hover:bg-highlight text-sm transition-colors";

/* -------------------------------------------------------------------------- */
/* Unfiled — the always-present default folder, styled distinctly              */
/* -------------------------------------------------------------------------- */
const UnfiledRow: React.FC<{
  count: number;
  isActive: boolean;
  onSelect: () => void;
}> = ({ count, isActive, onSelect }) => (
  <div
    onClick={onSelect}
    className={twMerge(
      "flex items-center gap-2.5 px-3 py-2.5 rounded-full cursor-pointer text-sm border transition-colors",
      isActive
        ? "bg-highlight border-transparent"
        : "bg-muted/60 border-divider hover:bg-highlight"
    )}
  >
    <InboxIcon size="16" className="shrink-0 text-muted-foreground" />
    <Text className="flex-1 font-medium">Unfiled</Text>
    <Badge color="gray" variant="soft">
      {count}
    </Badge>
  </div>
);

/* -------------------------------------------------------------------------- */
/* User folder row — draggable, inline rename, dropdown actions                */
/* -------------------------------------------------------------------------- */
const FolderRow: React.FC<{
  folder: FolderType;
  count: number;
  isActive: boolean;
  isOver: boolean;
  isDragging: boolean;
  onSelect: () => void;
  onRename: (name: string) => void;
  onDelete: () => void;
  onDragStart: () => void;
  onDragEnterRow: () => void;
  onDrop: () => void;
  onDragEnd: () => void;
}> = ({
  folder,
  count,
  isActive,
  isOver,
  isDragging,
  onSelect,
  onRename,
  onDelete,
  onDragStart,
  onDragEnterRow,
  onDrop,
  onDragEnd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(folder.name);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const commitRename = () => {
    const value = draft.trim();
    if (value && value !== folder.name) onRename(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        className="flex items-center gap-1 px-2 py-1"
        onSubmit={(e) => {
          e.preventDefault();
          commitRename();
        }}
      >
        <TextField.Root
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitRename}
          className="flex-1"
        />
        <IconButton size="1" variant="soft" type="submit" aria-label="Save">
          <CheckIcon size="14" />
        </IconButton>
      </form>
    );
  }

  return (
    <>
      <div
        draggable
        onDragStart={onDragStart}
        onDragEnter={onDragEnterRow}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onDragEnd={onDragEnd}
        onClick={onSelect}
        className={twMerge(
          rowClass,
          isActive && "bg-highlight",
          isOver && "border-t-2 border-accent-8 rounded-none",
          isDragging && "opacity-40"
        )}
      >
        <FolderIcon size="16" className="shrink-0 text-muted-foreground" />
        <Text className="flex-1 line-clamp-1">{folder.name}</Text>

        <Badge
          color="gray"
          className={twMerge("group-hover/row:hidden", menuOpen && "hidden")}
        >
          {count}
        </Badge>

        <div
          className={twMerge(
            "hidden group-hover/row:block",
            menuOpen && "block"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenu.Trigger>
              <IconButton
                size="1"
                color="gray"
                variant="ghost"
                aria-label="Folder actions"
              >
                <MoreVerticalIcon size="15" />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item
                onSelect={() => {
                  setDraft(folder.name);
                  setIsEditing(true);
                }}
              >
                Rename
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                color="red"
                onSelect={() => setConfirmOpen(true)}
              >
                Delete
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>

      <AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialog.Content className="max-w-md">
          <AlertDialog.Title>Delete folder?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Items inside “{folder.name}” will be moved to Unfiled.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action onClick={onDelete}>
              <Button variant="solid" color="red">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

/* -------------------------------------------------------------------------- */
const PanelFolders: React.FC = () => {
  const dispatch = useAppDispatch();

  const folders = useAppSelector(FolderSelectors.selectAll);
  const activeFolderId = useAppSelector(FolderSelectors.selectActiveFolderId);
  const contents = useAppSelector((state) =>
    ContentSelectors.selectAll(state.content)
  );

  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState("");

  const [dragId, setDragId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const countByFolder = useMemo(() => {
    const map: Record<string, number> = {};
    let unfiled = 0;

    for (const content of contents) {
      if (content.folderId) {
        map[content.folderId] = (map[content.folderId] || 0) + 1;
      } else {
        unfiled += 1;
      }
    }

    return { map, unfiled };
  }, [contents]);

  const handleCreate = () => {
    const name = draft.trim();
    if (!name) {
      setIsCreating(false);
      return;
    }

    const folder: FolderType = {
      id: v4(),
      name,
      createdAt: Date.now(),
    };

    dispatch(FolderActions.addOne(folder));
    setDraft("");
    setIsCreating(false);
  };

  const handleDelete = (folder: FolderType) => {
    const affected = contents
      .filter((content) => content.folderId === folder.id)
      .map((content) => ({ id: content.id, folderId: null }));

    if (affected.length) dispatch(ContentActions.updateMany(affected));
    dispatch(FolderActions.removeOne(folder.id));
  };

  const handleReorder = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    const ids = folders.map((folder) => folder.id);
    const from = ids.indexOf(sourceId);
    if (from < 0) return;

    ids.splice(from, 1);
    const insertAt = ids.indexOf(targetId);
    ids.splice(insertAt < 0 ? ids.length : insertAt, 0, sourceId);

    dispatch(FolderActions.reorder(ids));
  };

  return (
    <Panel.Root>
      <Panel.Header>
        <Panel.Title>Folders</Panel.Title>

        <IconButton
          size="3"
          color="gray"
          variant="ghost"
          aria-label="New folder"
          onClick={() => {
            setDraft("");
            setIsCreating(true);
          }}
        >
          <Tooltip content="New folder">
            <FolderPlusIcon size="16" />
          </Tooltip>
        </IconButton>
      </Panel.Header>

      <Panel.Content>
        <div className="flex flex-col gap-1 -mx-2">
          <UnfiledRow
            count={countByFolder.unfiled}
            isActive={activeFolderId === null}
            onSelect={() => dispatch(FolderActions.setActiveFolder(null))}
          />

          {folders.length ? <div className="h-px bg-divider my-1 mx-3" /> : null}

          {isCreating ? (
            <form
              className="flex items-center gap-1 px-2 py-1"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreate();
              }}
            >
              <TextField.Root
                autoFocus
                placeholder="Folder name"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={handleCreate}
                className="flex-1"
              />
              <IconButton
                size="1"
                variant="soft"
                type="submit"
                aria-label="Create"
              >
                <CheckIcon size="14" />
              </IconButton>
              <IconButton
                size="1"
                color="gray"
                variant="soft"
                aria-label="Cancel"
                onClick={() => setIsCreating(false)}
              >
                <XIcon size="14" />
              </IconButton>
            </form>
          ) : null}

          {folders.map((folder) => (
            <FolderRow
              key={folder.id}
              folder={folder}
              count={countByFolder.map[folder.id] || 0}
              isActive={activeFolderId === folder.id}
              isOver={overId === folder.id && dragId !== folder.id}
              isDragging={dragId === folder.id}
              onSelect={() =>
                dispatch(FolderActions.setActiveFolder(folder.id))
              }
              onRename={(name) =>
                dispatch(FolderActions.renameOne({ id: folder.id, name }))
              }
              onDelete={() => handleDelete(folder)}
              onDragStart={() => setDragId(folder.id)}
              onDragEnterRow={() => setOverId(folder.id)}
              onDrop={() => {
                if (dragId) handleReorder(dragId, folder.id);
                setDragId(null);
                setOverId(null);
              }}
              onDragEnd={() => {
                setDragId(null);
                setOverId(null);
              }}
            />
          ))}
        </div>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelFolders;
