export interface IMediaService {
  convertFileToMediaJSON(file: File): Promise<MediaType>;
}

export type MediaType = {
  id: string;
  contentId: string | undefined;
  stockId: string | undefined;
  fileId: string | undefined;
  file: File;
  preview: FileReader["result"];
  meta: any;
  createdAt: Date;
};

// export type MediaFileJSONType = {
//   id: string;
//   fileId: string | undefined;
//   fileSlug: string;
//   file: File;
//   preview: FileReader["result"];
//   meta: any;
//   createdAt: Date;
// };
