import type { MediaType } from "@/types/media.type";

import { useAppDispatch, useAppSelector } from "@/store";
import { ContentSelectors } from "@/store/features/content.slice";
import { MediaActions } from "@/store/features/media.slice";

import { Card, Flex, IconButton, TextField } from "@radix-ui/themes";
import { ExternalLinkIcon, XIcon } from "lucide-react";
import { Link } from "@/router";

type MediaCardItemProps = {
  media: MediaType;
};

const MediaCardItem: React.FC<MediaCardItemProps> = ({ media }) => {
  const dispatch = useAppDispatch();

  const content = useAppSelector((state) =>
    ContentSelectors.selectById(state.content, media.contentId!)
  );

  const handleDelete = () => {
    dispatch(MediaActions.removeOne(media.id));
  };

  const handleChangeStockId = (value: string) => {
    dispatch(
      MediaActions.updateOne({
        id: media.id,
        stockId: value,
      })
    );
  };

  const value = content?.stockId || media?.stockId || "";
  const hasContent = !!content?.id;

  return (
    <Card className="group flex flex-col gap-2">
      <div className="relative overflow-clip rounded-lg aspect-video">
        <img
          src={`${media.preview}`}
          alt={media?.file?.name || ""}
          className="w-full h-full object-cover"
          draggable={false}
        />

        <div className="absolute top-0 right-0 p-2 hidden group-hover:flex">
          <IconButton
            color="red"
            size="1"
            aria-label="Delete"
            onClick={handleDelete}
          >
            <XIcon size="14" />
          </IconButton>
        </div>
      </div>

      <Flex align="center" gap="1">
        <TextField.Root
          placeholder="Stock ID"
          value={value}
          size="1"
          readOnly={hasContent}
          className="flex-1"
          onChange={(e) => handleChangeStockId(e.target.value)}
        />

        {media?.contentId && (
          <IconButton asChild size="1" variant="soft" color="gray">
            <Link to="/contents/:id" params={{ id: media.contentId }}>
              <ExternalLinkIcon size="14" />
            </Link>
          </IconButton>
        )}
      </Flex>
    </Card>
  );
};

export default MediaCardItem;
