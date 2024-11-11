export type MediaType = {
  id: string;
  contentId: string | undefined;
  stockId: string | undefined;
  file: File;
  preview: FileReader["result"];
  meta: any;
  createdAt: Date;
};
