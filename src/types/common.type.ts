export type ResponseType<TData = any> = {
  data: TData;
  error: string | undefined | null;
  status: boolean;
};
