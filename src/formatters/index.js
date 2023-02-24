import getStylish from './stylish.js';
import getPlain from './plain.js';
import getJSON from './json.js';

const getFormat = (data, format) => {
  if (format === 'json') {
    return getJSON(data);
  }
  if (format === 'plain') {
    return getPlain(data);
  }
  return getStylish(data);
};

export default getFormat;
