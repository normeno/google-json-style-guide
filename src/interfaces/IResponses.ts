interface IErrors {
  domain: string;
  reason?: string;
  message: string;
  location?: string;
  locationType?: string;
  extendedHelper?: string;
  sendReport?: string;
}

interface IError {
  code: string;
  message: string;
  error?: Array<IErrors>
}

interface IErrorResponse {
  apiVersion: string,
  context: string,
  error: IError;
}

interface IStoredResponse {
  apiVersion: string,
  context: string,
  data: {
    stored: boolean;
  };
}

interface IUpdatedResponse {
  apiVersion: string,
  context: string,
  data: {
    updated: boolean;
  };
}

interface IDeletedResponse {
  apiVersion: string,
  context: string,
  data: {
    deleted: boolean;
  };
}

interface IOneResponse {
  apiVersion: string,
  context: string,
  data: any
}

interface IListData {
  totalItems: number,
  itemsPerPage: number,
  totalPages: number,
  previousLink: string,
  selfLink: string,
  nextLink: string,
  items: any
}

interface IListResponse {
  apiVersion: string,
  context: string,
  data: IListData
}

export {
  IErrors,
  IError,
  IErrorResponse,
  IStoredResponse,
  IUpdatedResponse,
  IDeletedResponse,
  IOneResponse,
  IListData,
  IListResponse
}