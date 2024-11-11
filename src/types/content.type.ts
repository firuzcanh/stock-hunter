export type ContentType = {
  id: string;
  stockId: string;
  title: string;
  titleParaphrased: string;
  description: string;
  keywords: string[];
  isEditorial: false;
  categories: ContentCategoryType[];
  src: string;
  status: ContentStatusType;
  createdAt: Date;
};

export type ContentStatusType = "TODO" | "DONE";

export type ContentCategoryType = {
  id: string;
  type: string;
  name: string;
};
