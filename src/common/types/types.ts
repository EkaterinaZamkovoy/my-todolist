export type fieldError = {
  error: string;
  field: string;
};

export type BaseResponse<T = {}> = {
  data: T;
  fieldsErrors: fieldError[];
  messages: string[];
  resultCode: number;
};
