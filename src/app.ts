import {
  IError,
  IErrorResponse,
  IStoredResponse,
  IUpdatedResponse,
  IDeletedResponse,
  IOneResponse,
  IListData,
  IListResponse
} from './interfaces/IResponses';

import * as formatter from './formatter';

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

  store(stored: boolean) :IStoredResponse {
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      data: {
        stored
      }
    }
  }

  update(updated: boolean) :IUpdatedResponse {
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      data: {
        updated
      }
    }
  }

  delete(deleted: boolean) : IDeletedResponse {
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      data: {
        deleted
      }
    }
  }

  one(data: any) : IOneResponse {
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      data: this.format().formatAll(data)
    }
  }

  list(data: IListData) : IListResponse {
    data.items = this.format().formatAll(data.items);
    return {
      apiVersion: this.apiVersion,
      context: this.context,
      data: data
    }
  }

  format() {
    return formatter;
  }
}

export = App;