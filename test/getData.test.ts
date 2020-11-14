import GjsonResponse from '../src/app';
import { IOneResponse, IListData, IListResponse } from '../src/interfaces/IResponses';

const apiVersion: string = "1.0";
const context: string = "Error Tests";
const gjsonResponse = new GjsonResponse(apiVersion, context);

test('one', () => {
  const data: {[k: string]: any} = {
    id: 2,
    Email: "nicolas@ormeno.com",
    "first-Name": "Nicolas",
    lastName: "Ormeno"
  };

  const expected: IOneResponse = {
    apiVersion,
    context,
    data: {
      id: 2,
      email: "nicolas@ormeno.com",
      firstName: "Nicolas",
      lastName: "Ormeno"
    }
  }

  const response: IOneResponse = gjsonResponse.one(data);

  expect(response).toEqual(expected);
});

test('list', () => {
  const data: IListData = {
    totalItems: 100,
    itemsPerPage: 10,
    totalPages: 10,
    previousLink: "https.//previous.link",
    selfLink: "https.//self.link",
    nextLink: "https.//next.link",
    items: [{
      id: 1,
      name: "cerulean",
      Year: 2000,
      color: "#98B2D1",
      PantoneValue: "15-4020"
    },
    {
      id: 2,
      name: "fuchsia rose",
      year: 2001,
      color: "#C74375",
      pantoneValue: "17-2031"
    }]
  };

  const response: IListResponse = gjsonResponse.list(data);

  const expected: IListResponse = {
    apiVersion,
    context,
    data: {
      totalItems: 100,
      itemsPerPage: 10,
      totalPages: 10,
      previousLink: "https.//previous.link",
      selfLink: "https.//self.link",
      nextLink: "https.//next.link",
      items: [{
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantoneValue: "15-4020"
      },
      {
        id: 2,
        name: "fuchsia rose",
        year: 2001,
        color: "#C74375",
        pantoneValue: "17-2031"
      }]
    }
  }

  expect(response).toEqual(expected);
});