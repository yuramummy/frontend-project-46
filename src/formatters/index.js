import getDiff from '../get-diff.js';
import getString from './stylish.js';
import getPlain from './plain.js';

const getFormat = (obj1, obj2, format) => {
  if (format === 'plain') {
    return getPlain(getDiff(obj1, obj2));
  }
  return getString(getDiff(obj1, obj2));
};

export default getFormat;
