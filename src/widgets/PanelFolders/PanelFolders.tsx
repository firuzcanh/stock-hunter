import type { FolderType } from "@/types/folder.type";

import { useMemo, useState } from "react";
import { v4 } from "uuid";

import { useAppDispatch, useAppSelector } from "@/store";
import { ContentActions, ContentSelectors } from "@/store/features/content.slice";
import { FolderActions, FolderSelectors } from "@/store/features/folder.slice";

import { Badge, IconButton, Text, TextField, Tooltip } from "@radix-ui/themes";
import {
  CheckIcon,
  FolderIcon,
  FolderPlusIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { Confirm, Panel } from "@/components";
import { twMerge } from "tailwind-merge";

const rowClass =
  "group/row flex items-center gap-2.5 px-3 py-2.5 rounded-full cursor-pointer hover:bg-highlight text-sm transition-colors";

const FolderRow: React.FC<{
  id: string | null;
  name: string;
  count: number;
  isActive: boolean;
  isEditable?: boolean;
  onSelect: () => void;
  onRename?: (name: string) => void;
  onDelete?: () => void;
}> = ({
  name,
  count,
  isActive,
  isEditable,
  onSelect,
  onRename,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const commitRename = () => {
    const value = draft.trim();
    if (value && value !== name) onRename?.(value);
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
    <div
      className={twMerge(rowClass, isActive && "bg-highlight")}
      onClick={onSelect}
    >
      <FolderIcon size="16" className="shrink-0 text-muted-foreground" />
      <Text className="flex-1 line-clamp-1">{name}</Text>

      {isEditable ? (
        <div className="items-center gap-1 hidden group-hover/row:flex">
          <IconButton
            size="1"
            color="gray"
            variant="ghost"
            aria-label="Rename"
            onClick={(e) => {
              e.stopPropagation();
              setDraft(name);
              setIsEditing(true);
            }}
          >
            <PencilIcon size="13" />
          </IconButton>

          <div onClick={(e) => e.stopPropagation()}>
            <Confirm
              title="Delete folder?"
              description="Items inside will be moved to Unfiled."
              onConfirm={() => onDelete?.()}
            >
              <IconButton
                size="1"
                color="red"
                variant="ghost"
                aria-label="Delete"
              >
                <TrashIcon size="13" />
              </IconButton>
            </Confirm>
          </div>
        </div>
      ) : null}

      <Badge color="gray" className="group-hover/row:hidden">
        {count}
      </Badge>
    </div>
  );
};

const PanelFolders: React.FC = () => {
  const dispatch = useAppDispatch();

  const folders = useAppSelector(FolderSelectors.selectAll);
  const activeFolderId = useAppSelector(FolderSelectors.selectActiveFolderId);
  const contents = useAppSelector((state) =>
    ContentSelectors.selectAll(state.content)
  );

  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState("");

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
        <div className="flex flex-col -mx-2">
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

          <FolderRow
            id={null}
            name="Unfiled"
            count={countByFolder.unfiled}
            isActive={activeFolderId === null}
            onSelect={() => dispatch(FolderActions.setActiveFolder(null))}
          />

          {folders.map((folder) => (
            <FolderRow
              key={folder.id}
              id={folder.id}
              name={folder.name}
              count={countByFolder.map[folder.id] || 0}
              isActive={activeFolderId === folder.id}
              isEditable
              onSelect={() =>
                dispatch(FolderActions.setActiveFolder(folder.id))
              }
              onRename={(name) =>
                dispatch(FolderActions.renameOne({ id: folder.id, name }))
              }
              onDelete={() => handleDelete(folder)}
            />
          ))}
        </div>
      </Panel.Content>
    </Panel.Root>
  );
};

export default PanelFolders;
