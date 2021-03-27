export interface Error {
  message: string;
  response: {
    status: number;
    data: {
      error: {
        [errorKey: string]: any;
      };
    };
  };
}
