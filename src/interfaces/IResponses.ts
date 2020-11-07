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

export { IErrors, IError, IErrorResponse }