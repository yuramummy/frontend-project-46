import getDiff from '../get-diff.js';
import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getFormat = (obj1, obj2, format) => {
  if (format === 'json') {
    return getJSON(getDiff(obj1, obj2));
  }
  if (format === 'plain') {
    return getPlain(getDiff(obj1, obj2));
  }
  return getStylish(getDiff(obj1, obj2));
};

export default getFormat;
