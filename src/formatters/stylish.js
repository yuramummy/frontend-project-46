import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth) => replacer.repeat(depth * spacesCount - spacesCount);

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }

  const entries = Object.entries(data);
  const lines = entries.map(([key, val]) => `${getIndent(depth)}  ${key}: ${stringify(val, depth + 1)}`);
  return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
};

const getStylish = (array) => {
  const iter = (node, depth) => {
    const lines = node.map((data) => {
      const {
        type, key, value, addedValue, deletedValue, children,
      } = data;

      if (type === 'parent') {
        return `${getIndent(depth)}  ${key}: ${iter(children, depth + 1)}`;
      }
      if (type === 'added') {
        return `${getIndent(depth)}+ ${key}: ${stringify(value, depth + 1)}`;
      }
      if (type === 'deleted') {
        return `${getIndent(depth)}- ${key}: ${stringify(value, depth + 1)}`;
      }
      if (type === 'unchanged') {
        return `${getIndent(depth)}  ${key}: ${stringify(value, depth + 1)}`;
      }
      return `${getIndent(depth)}- ${key}: ${stringify(deletedValue, depth + 1)}\n${getIndent(depth)}+ ${key}: ${stringify(addedValue, depth + 1)}`;
    });
    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };
  return iter(array, 1);
};

export default getStylish;
