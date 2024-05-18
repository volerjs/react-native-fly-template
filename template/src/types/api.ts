export interface ResponseData<T> {
  data: T;
  code: string;
  message: string;
}

export interface PageData<T> {
  list: T[];
  page: {
    total: number;
    pageSize: number;
    pageNum: number;
    totalNum: number;
  };
}
