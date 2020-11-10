import _ from 'lodash';
import dayjs from 'dayjs';

let toCamelCase = (data: {[k: string]: any}): object => {
  _.forIn(data, function(value, key) {
    const newKey = _.camelCase(key);
    const clone = _.clone(data[key]);
    delete data[key];
    data[newKey] = clone;
  });
  
  return data;
};

let toCamelCase2 = (key: string) : string => {
  const newKey = _.camelCase(key);
  return (key === newKey) ? null : newKey;
}

let removeByValue = (value: any) : boolean => {
  return !value;
};

let dateTimeToRFC3339 = (datetime?: string, format?: string) : string => {
  if (!datetime) {
    return null;
  }
  
  const customParseFormat = require('dayjs/plugin/customParseFormat');
  dayjs.extend(customParseFormat);

  const formattedDateTime = (format)
    ? dayjs(datetime, format)
    : dayjs(datetime);
  
  if (!formattedDateTime.isValid()) {
    return null;
  }

  return formattedDateTime.toISOString();
};

let replaceKey = (data: any, key: string) => {
  const newKey = toCamelCase2(key);
  
  if (newKey) {
    const clone = _.clone(data[key]);
    delete data[key];
    data[newKey] = clone;
  }

  return data;
} 

let formatAll = (data: {[k: string]: any}) : any => {
  _.forIn(data, function(value, key) {
    if (Array.isArray(data[key]) || (typeof data[key] === 'object' && data[key] !== null)) {
      _.forIn(data[key], function(v, k) {
        data[key] = replaceKey(data[key], k);

        if (removeByValue(v)) {
          delete data[key][k];
        }

        const formattedDate = dateTimeToRFC3339(v);
        if (formattedDate) {
          data[key][k] = formattedDate;
        }
      });
    } else {
      data = replaceKey(data, key);
    
      if (removeByValue(value)) {
        delete data[key];
      }

      const formattedDate = dateTimeToRFC3339(value);
      if (formattedDate) {
        data[key] = formattedDate;
      }
    }
  });

  return data;
};

export {
  toCamelCase,
  removeByValue,
  dateTimeToRFC3339,
  formatAll,
};