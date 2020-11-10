import GjsonResponse from '../src/app';
import {
  IStoredResponse,
  IUpdatedResponse,
  IDeletedResponse
} from '../src/interfaces/IResponses';

const apiVersion: string = "1.0";
const context: string = "Alter Data Tests";
const gjsonResponse = new GjsonResponse(apiVersion, context);

test('Store', () => {
  const response: IStoredResponse = gjsonResponse.store(true);
  
  const expected: IStoredResponse = {
    apiVersion,
    context,
    data: {stored: true}
  }

  expect(response).toEqual(expected);
});

test('Update', () => {
  const response: IUpdatedResponse = gjsonResponse.update(true);
  
  const expected: IUpdatedResponse = {
    apiVersion,
    context,
    data: {updated: true}
  }

  expect(response).toEqual(expected);
});

test('Delete', () => {
  const response: IDeletedResponse = gjsonResponse.delete(true);
  
  const expected: IDeletedResponse = {
    apiVersion,
    context,
    data: {deleted: true}
  }

  expect(response).toEqual(expected);
});