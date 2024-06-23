class ResponsePayload<T> {
  code: number;
  message: string;
  result: ResponseResult<T> | null;

  constructor(
    code: number,
    message: string,
    result: ResponseResult<T> | null = null,
  ) {
    this.code = code;
    this.message = message;
    this.result = result;
  }
}

type ResponseResult<T> = {
  data: T | CustomPagination<T> | null;
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  limit: number;
  lastPage?: number;
  total?: number;
};

type CustomPagination<T> = {
  list: T;
  pagination: Pagination;
  statusId?: number;
};

export { ResponsePayload, Pagination };
