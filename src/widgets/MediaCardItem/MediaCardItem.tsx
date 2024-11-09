import type { MediaType } from "@/types/media.type";
import { Card, IconButton, TextField } from "@radix-ui/themes";
import { XIcon } from "lucide-react";

type MediaCardItemProps = {
  media: MediaType;
};

const MediaCardItem: React.FC<MediaCardItemProps> = () => {
  return (
    <Card className="group flex flex-col gap-2">
      <div className="relative overflow-clip rounded-lg aspect-video">
        <img
          src="https://images.unsplash.com/photo-1638401985663-11bb99e6276e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute top-0 right-0 p-2 hidden group-hover:flex">
          <IconButton color="red" size="1" aria-label="Delete">
            <XIcon size="14" />
          </IconButton>
        </div>
      </div>

      <TextField.Root placeholder="Stock ID" />
    </Card>
  );
};

export default MediaCardItem;
