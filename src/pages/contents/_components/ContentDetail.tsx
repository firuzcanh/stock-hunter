import { ContentType } from "@/types/content.type";

import { useAppDispatch, useAppSelector } from "@/store";
import { useState } from "react";

import { Services } from "@/services";
import {
  ContentActions,
  ContentSelectors,
} from "@/store/features/content.slice";
import { FolderSelectors } from "@/store/features/folder.slice";
import { MediaSelectors } from "@/store/features/media.slice";
import { shuffleArray } from "@/utils/functions";

import { Confirm, ContentEdit, Copy, DetailCard, Marker } from "@/components";
import {
  Badge,
  Grid,
  IconButton,
  Link as RadixLink,
  Select,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { RefreshCwIcon, TrashIcon, XIcon } from "lucide-react";
import Alerts from "./Alerts";

import { DEFAULT_CONFIGS } from "@/constants/configs";

const UNFILED = "__unfiled__";

const ContentDetail: React.FC<{
  contentId: string;
  onClose: () => void;
}> = ({ contentId, onClose }) => {
  const dispatch = useAppDispatch();

  // Config Options
  const options = useAppSelector((state) => state.configs.options);

  // Content Object
  const content = useAppSelector((state) =>
    ContentSelectors.selectById(state.content, contentId)
  );

  // Folders (for moving)
  const folders = useAppSelector(FolderSelectors.selectAll);

  // Medias Array
  const medias = useAppSelector((state) =>
    MediaSelectors.selectManyByContentId(state.media, contentId)
  );

  const [isLoadingParaphrase, setIsLoadingParaphrase] = useState(false);

  if (!content) return null;

  const categoriesAsString = (content?.categories || [])
    ?.map((category) => category.name)
    ?.join(", ");

  const handleParaphraseAgain = async () => {
    try {
      setIsLoadingParaphrase(true);

      const response = await Services.AI.paraphrase(content.title);
      const titleParaphrased = response?.data?.text;

      if (!titleParaphrased) return;

      dispatch(ContentActions.updateOne({ ...content, titleParaphrased }));
    } finally {
      setIsLoadingParaphrase(false);
    }
  };

  const handleShuffleAgain = () => {
    const keywords = shuffleArray(content.keywords, options.shuffleOffset);
    dispatch(ContentActions.updateOne({ ...content, keywords }));
  };

  const handleDelete = () => {
    dispatch(ContentActions.removeOne(contentId));
    onClose();
  };

  const handleUpdate = (key: keyof ContentType, value: any) => {
    dispatch(ContentActions.updateOne({ id: contentId, [key]: value }));
  };

  const handleMove = (value: string) => {
    handleUpdate("folderId", value === UNFILED ? null : value);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 sticky z-[1] top-0 h-[60px] px-6 bg-panel text-panel-foreground border-b border-divider">
        <Tooltip content="Original Title">
          <Text weight="bold" className="line-clamp-1 flex-1">
            {content.title}
          </Text>
        </Tooltip>

        <Confirm onConfirm={handleDelete}>
          <IconButton color="gray" variant="ghost" aria-label="Delete">
            <Tooltip content="Delete">
              <TrashIcon size="16" />
            </Tooltip>
          </IconButton>
        </Confirm>

        <IconButton
          color="gray"
          variant="ghost"
          aria-label="Close"
          onClick={onClose}
        >
          <Tooltip content="Close">
            <XIcon size="18" />
          </Tooltip>
        </IconButton>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Alert Messages */}
        <Alerts content={content} />

        {/* START :: Folder */}
        <DetailCard.Root>
          <DetailCard.Label children={<Marker>Folder</Marker>} />
          <DetailCard.Slot>
            <Select.Root
              value={content.folderId || UNFILED}
              onValueChange={handleMove}
            >
              <Select.Trigger className="w-full" />
              <Select.Content>
                <Select.Item value={UNFILED}>Unfiled</Select.Item>
                {folders.map((folder) => (
                  <Select.Item key={folder.id} value={folder.id}>
                    {folder.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </DetailCard.Slot>
        </DetailCard.Root>
        {/* END :: Folder */}

        {/* START :: Medias */}
        {medias?.length > 0 ? (
          <DetailCard.Root>
            <DetailCard.Label children={<Marker>Medias</Marker>} />
            <DetailCard.Slot>
              <Grid columns="4" gap="3">
                {medias?.map((media) => (
                  <img
                    key={media.id}
                    src={`${media.preview}`}
                    alt=""
                    className="aspect-square rounded-lg border border-border p-0.5 bg-background object-cover"
                  />
                ))}
              </Grid>
            </DetailCard.Slot>
          </DetailCard.Root>
        ) : null}
        {/* END :: Medias */}

        {/* START :: ID */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                ID
                <Copy.Button
                  value={content.id}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot children={<Marker>{contentId}</Marker>} />
        </DetailCard.Root>
        {/* END :: ID */}

        {/* START :: Paraphrased Title */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Paraphrased Title
                <Separator orientation="vertical" />
                <Badge
                  color={
                    content.titleParaphrased?.length >
                    DEFAULT_CONFIGS.RECOMMENDED_PARAPHRASED_TITLE_SIZE
                      ? "red"
                      : "green"
                  }
                  size="2"
                >
                  {content.titleParaphrased?.length || 0}
                </Badge>
                <IconButton
                  size="1"
                  color="gray"
                  variant="soft"
                  className="opacity-0 group-hover:opacity-100"
                  aria-label="Paraphrase again"
                  loading={isLoadingParaphrase}
                  onClick={handleParaphraseAgain}
                  children={<RefreshCwIcon size="14" />}
                />
                <Copy.Button
                  value={`${content.titleParaphrased} ID_${content.id}`}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot
            children={
              <Marker>
                <ContentEdit
                  value={content.titleParaphrased}
                  onSave={(value) => handleUpdate("titleParaphrased", value)}
                />
              </Marker>
            }
          />
        </DetailCard.Root>
        {/* END :: Paraphrased Title */}

        {/* START :: Keywords */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Keywords
                <Separator orientation="vertical" />
                <Badge color="green" size="2">
                  {content.keywords?.length || 0}
                </Badge>
                <IconButton
                  size="1"
                  color="gray"
                  variant="soft"
                  className="opacity-0 group-hover:opacity-100"
                  aria-label="Shuffle again"
                  onClick={handleShuffleAgain}
                  children={<RefreshCwIcon size="14" />}
                />
                <Copy.Button
                  value={content.keywords?.join(", ")}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot
            children={
              <Marker>
                <ContentEdit
                  value={content.keywords?.join(", ")}
                  onSave={(value) =>
                    handleUpdate("keywords", value?.split(", "))
                  }
                />
              </Marker>
            }
          />
        </DetailCard.Root>
        {/* END :: Keywords */}

        {/* START :: Stock ID */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Stock ID
                <Copy.Button
                  value={content.stockId}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot
            children={
              <Marker>
                <RadixLink
                  href={`https://www.shutterstock.com/image-photo/${content.stockId}`}
                  target="_blank"
                  rel="nofollow noreferrel"
                >
                  {content.stockId}
                </RadixLink>
              </Marker>
            }
          />
        </DetailCard.Root>
        {/* END :: Stock ID */}

        {/* START :: Categories */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Categories
                <Copy.Button
                  value={categoriesAsString}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot children={<Marker>{categoriesAsString}</Marker>} />
        </DetailCard.Root>
        {/* END :: Categories */}

        {/* START :: Original Title */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Original Title
                <Separator orientation="vertical" />
                <Badge color="green" size="2">
                  {content.title?.length || 0}
                </Badge>
                <Copy.Button
                  value={`${content.title} ID_${content.id}`}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot
            children={
              <Marker>
                <ContentEdit
                  value={content.title}
                  onSave={(value) => handleUpdate("title", value)}
                />
              </Marker>
            }
          />
        </DetailCard.Root>
        {/* END :: Original Title */}

        {/* START :: Original Image */}
        <DetailCard.Root>
          <DetailCard.Label
            children={
              <Marker>
                Original Image
                <Copy.Button
                  value={content.src}
                  size="1"
                  className="opacity-0 group-hover:opacity-100"
                />
              </Marker>
            }
          />
          <DetailCard.Slot
            children={
              <Marker asChild className="rounded-lg w-full">
                <img src={content.src} alt={content.title} />
              </Marker>
            }
          />
        </DetailCard.Root>
        {/* END :: Original Image */}
      </div>
    </div>
  );
};

export default ContentDetail;
