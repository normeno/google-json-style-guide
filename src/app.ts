import { IError, IErrorResponse } from './interfaces/IResponses';

class App {
  apiVersion: string;
  context: string;

  constructor(apiVersion: string, context: string) {
    this.apiVersion = apiVersion;
    this.context = context;
  }

  error(error: IError) : IErrorResponse {
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      error
    }
  }
}

export = App;