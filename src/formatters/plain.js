import _ from 'lodash';

const selectValueType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return String(value);
};

export default (diffTree) => {
  const iter = (nodes, ancestry) => {
    const lines = nodes.flatMap((node) => {
      const currentPropertyName = [...ancestry, node.key].join('.');

      const value = selectValueType(node.value);
      const oldValue = selectValueType(node.oldValue);
      const newValue = selectValueType(node.newValue);

      switch (node.status) {
        case 'added':
          return `Property '${currentPropertyName}' was added with value: ${value}`;
        case 'deleted':
          return `Property '${currentPropertyName}' was removed`;
        case 'changed':
          return `Property '${currentPropertyName}' was updated. From ${oldValue} to ${newValue}`;
        case 'nested':
          return iter(node.children, [...ancestry, node.key]);
        default:
          return [];
      }
    });

    return lines.join('\n');
  };

  return iter(diffTree, []);
};
