import { IMediaService, MediaType } from "@/types/media.type";

import { Services } from "..";

import { getResizedImageDataUrl } from "@/utils/functions";
import store from "@/store";

export class MediaService implements IMediaService {
  async convertFileToMediaJSON(file: File): Promise<MediaType> {
    const { content: contentState } = store.getState();

    const meta = await Services.File.getFileMeta(file);
    const description = await Services.File.getFileMetaDescription(file);

    const uniqueId = `${file.size}_${file.name}`;
    const fileId = this.getFileIDFromText(description); // Getting ID from description of metadata

    const content = fileId ? contentState.entities[fileId] : null;

    const preview = await getResizedImageDataUrl(file, {
      width: 239,
      height: 135,
    });

    return {
      id: uniqueId,
      contentId: content?.id,
      stockId: content?.stockId,
      fileId,
      createdAt: new Date(),
      file,
      preview,
      meta,
    };
  }

  async convertMultipleFileToMediaJSON(files: File[]): Promise<MediaType[]> {
    const data: MediaType[] = [];

    for (const file of files) {
      try {
        const media = await this.convertFileToMediaJSON(file);
        data.push(media);
      } catch (error) {
        console.error("Error on convertMultipleFileToMediaJSON:", error);
      }
    }

    return data;
  }

  getFileIDFromText(text: string) {
    if (!text) return undefined;

    const regex = /([a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})/;
    const match = text.match(regex);

    if (!match) return undefined;
    return match[1];
  }
}
