import _ from 'lodash';
import GjsonResponse from '../src/app';

const apiVersion: string = "1.0";
const context: string = "Formatter Tests";
const gjsonResponse = new GjsonResponse(apiVersion, context);

describe('toCamelCase', () => {
  var data: {[k: string]: any};
  var expected: {[k: string]: any};

  test('Upper', () => {
    data = {'Key': 'value'};
    expected = {'key': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });

  test('Lower', () => {
    data = {'key': 'value'};
    expected = {'key': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });

  test('Camel', () => {
    data = {'keyKey': 'value'};
    expected = {'keyKey': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });

  test('Pascal', () => {
    data = {'KeyKey': 'value'};
    expected = {'keyKey': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });

  test('Underscore', () => {
    data = {'Key_1': 'value'};
    expected = {'key1': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });

  test('Dash', () => {
    data = {'key-1': 'value'};
    expected = {'key1': 'value'};
    expect(gjsonResponse.format().toCamelCase(data)).toEqual(expected);
  });
});

describe('removeByValue', () => {
  var data: {[k: string]: any};
  var expected: {[k: string]: any};

  test('Remove null', () => {
    data = {'key': null};
    expected = {};

    if (gjsonResponse.format().removeByValue(data['key'])) {
      delete data['key'];
    }
  
    expect(data).toEqual(expected);
  });

  test('Remove empty', () => {
    data = {'key': ''};
    expected = {};
  
    if (gjsonResponse.format().removeByValue(data['key'])) {
      delete data['key'];
    }
  
    expect(data).toEqual(expected);
  });

  test('Remove undefined', () => {
    data = {'key': undefined};
    expected = {};
  
    if (gjsonResponse.format().removeByValue(data['key'])) {
      delete data['key'];
    }
  
    expect(data).toEqual(expected);
  });

  test('Keep key', () => {
    data = {'key': 'value'};
    expected = {'key': 'value'};
  
    if (gjsonResponse.format().removeByValue(data['key'])) {
      delete data['key'];
    }
  
    expect(data).toEqual(expected);
  });
});

describe('dateTimeToRFC3339', () => {
  describe('Without Format', () => {
    test('YYYY-MM-DD', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('2020-10-31');
      expect(datetime).not.toBe(null);
    });
  
    test('YYYY-MM-DD HH:mm:ss', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('2020-10-31 01:02:03');
      expect(datetime).not.toBe(null);
    });
  });
  
  describe('With Format', () => {
    test('YYYY-MM-DD', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('2020-10-31', 'YYYY-MM-DD');
      expect(datetime).not.toBe(null);
    });
  
    test('YYYY-MM-DD HH:mm:ss', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('2020-10-31 01:02:03', 'YYYY-MM-DD HH:mm:ss');
      expect(datetime).not.toBe(null);
    });
  
    test('DD-MM-YYYY', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('31-10-2020', 'DD-MM-YYYY');
      expect(datetime).not.toBe(null);
    });
  
    test('DD-MM-YYYY HH:mm:ss', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('31-10-2020 01:02:03', 'DD-MM-YYYY HH:mm:ss');
      expect(datetime).not.toBe(null);
    });
  });

  describe('Invalid Formats', () => {
    test('DD-MM-YYYY', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('31-10-2020');
      expect(datetime).toBe(null);
    });

    test('DD-MM-YYYY', () => {
      const datetime = gjsonResponse.format().dateTimeToRFC3339('2020-10-31', 'DD-MM-YYYY');
      expect(datetime).toBe(null);
    });
  });
});

test('formatAll', () => {
  const datetime = '2020-11-10';
  const formattedDatetime = gjsonResponse.format().dateTimeToRFC3339(datetime, 'YYYY-MM-DD');

  const data: {[k: string]: any} = {
    updated: formattedDatetime,
    'null': null,
    'undefined': undefined,
    'empty': '',
    foo: 'bar',
    fooFoo1: 'barBar1',
    FooFoo2: 'barBar2',
    'foo_3': 'foo3',
    'foo_4': 'foo4',
    andObject: {
      updated: formattedDatetime,
      'null': null,
      'undefined': undefined,
      'empty': '',
      foo: 'bar',
      fooFoo1: 'barBar1',
      FooFoo2: 'barBar2',
      'foo_3': 'foo3',
      'foo_4': 'foo4',
    }
  };

  const expected: {[k: string]: any} = {
    updated: formattedDatetime,
    foo: 'bar',
    fooFoo1: 'barBar1',
    fooFoo2: 'barBar2',
    foo3: 'foo3',
    foo4: 'foo4',
    andObject: {
      updated: formattedDatetime,
      foo: 'bar',
      fooFoo1: 'barBar1',
      fooFoo2: 'barBar2',
      foo3: 'foo3',
      foo4: 'foo4',
    }
  };
  
  const formattedData = gjsonResponse.format().formatAll(data);
  expect(formattedData).toEqual(expected);
});