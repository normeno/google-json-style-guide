import GjsonResponse from '../src/app';
import { IError, IErrorResponse } from '../src/interfaces/IResponses';

const apiVersion: string = "1.0";
const context: string = "Error Tests";
const gjsonResponse = new GjsonResponse(apiVersion, context);

test('initialize', () => {
  const gjsonResponse = new GjsonResponse(apiVersion, context);
  expect(gjsonResponse).toBeDefined();
});

describe('Errors', () => {
  test('Without details', () => {
    const gjsonResponse = new GjsonResponse(apiVersion, context);
    
    const data: IError = {
      code: "404",
      message: "Not Found"
    };
  
    const response: IErrorResponse = gjsonResponse.error(data);
    
    const expected: IErrorResponse = {
      apiVersion,
      context,
      error: data
    }
  
    expect(response).toMatchObject(expected);
  });

  test('With details', () => {
    const data: IError = {
      code: '404',
      message: 'Not Found',
      error: [{
        domain: 'Calendar',
        reason: 'ResourceNotFoundException',
        message: 'File Not Found',
        location: '',
        locationType: '',
        extendedHelper: 'http://url.to.more.details.example.com/',
        sendReport: 'https://report.example.com/'
      }]
    };
  
    const response: IErrorResponse = gjsonResponse.error(data);
    
    const expected: IErrorResponse = {
      apiVersion,
      context,
      error: data
    }
  
    expect(response).toEqual(expected);
  });
});