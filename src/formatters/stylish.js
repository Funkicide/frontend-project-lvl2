import _ from 'lodash';

const markers = {
  added: '+ ',
  deleted: '- ',
  unchanged: '  ',
};

const getIndent = (depth, spacesCount = 4) => {
  const replacer = ' ';
  const markerLength = 2;
  return replacer.repeat((spacesCount * depth) - markerLength);
};

const getBracketIndent = (depth, spacesCount = 4) => {
  const replacer = ' ';
  return replacer.repeat((depth * spacesCount) - spacesCount);
};

const stringify = (value, depth) => {
  const iter = (currentValue, currentDepth) => {
    if (!_.isPlainObject(currentValue)) {
      return String(currentValue);
    }

    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${getIndent(currentDepth)}${markers.unchanged}${key}: ${stringify(val, currentDepth + 1)}`);

    return ['{', ...lines, `${getBracketIndent(currentDepth)}}`].join('\n');
  };
  return iter(value, depth);
};

export default (diffTree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      if (node.status === 'added') {
        return `${getIndent(depth)}${markers.added}${node.key}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.status === 'deleted') {
        return `${getIndent(depth)}${markers.deleted}${node.key}: ${stringify(node.value, depth + 1)}`;
      }
      if (node.status === 'changed') {
        const oldValue = `${getIndent(depth)}${markers.deleted}${node.key}: ${stringify(node.oldValue, depth + 1)}`;
        const newValue = `${getIndent(depth)}${markers.added}${node.key}: ${stringify(node.newValue, depth + 1)}`;
        return `${oldValue}\n${newValue}`;
      }
      if (node.status === 'nested') {
        return `${getIndent(depth)}${markers.unchanged}${node.key}: ${iter(node.children, depth + 1)}`;
      }
      return `${getIndent(depth)}${markers.unchanged}${node.key}: ${stringify(node.value, depth + 1)}`;
    });

    return ['{', ...lines, `${getBracketIndent(depth)}}`].join('\n');
  };

  return iter(diffTree, 1);
};
