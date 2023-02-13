import _ from 'lodash';

const stringify = (data) => {
  if (_.isObject(data)) { //
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};
//
const getPlain = (array) => {
  const iter = (node, path) => { //
    const lines = node.flatMap((data) => { //
      const {
        type, key, value, addedValue, deletedValue, children,
      } = data;

      if (type === 'parent') {
        return iter(children, `${path}${key}.`);
      }
      if (type === 'added') {
        return `Property '${path}${key}' was added with value: ${stringify(value)}`;
      }
      if (type === 'deleted') {
        return `Property '${path}${key}' was removed`;
      }
      if (type === 'changed') {
        return `Property '${path}${key}' was updated. From ${stringify(deletedValue)} to ${stringify(addedValue)}`;
      }
      return []; //
    });
    return lines.join('\n');
  };
  return iter(array, '');
};

export default getPlain;
