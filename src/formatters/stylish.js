import _ from 'lodash';

export default (diff) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spacesCount = 2;
    const nestedDepth = depth + 2;

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentValue.map((node) => {
      const key = node.key ?? node[0];
      const value = node.value ?? node[1];

      const {
        status,
        oldValue,
        newValue,
        children,
      } = node;

      const markers = {
        added: '+ ',
        deleted: '- ',
        unchanged: '  ',
      };

      const val = _.isObject(value)
        ? iter(Object.entries(value), nestedDepth)
        : value;
      const oldVal = _.isObject(oldValue)
        ? iter(Object.entries(oldValue), nestedDepth)
        : oldValue;
      const newVal = _.isObject(newValue)
        ? iter(Object.entries(newValue), nestedDepth)
        : newValue;

      switch (status) {
        case 'added':
          return `${currentIndent}${markers.added}${key}: ${val}`;
        case 'deleted':
          return `${currentIndent}${markers.deleted}${key}: ${val}`;
        case 'changed':
          return `${currentIndent}${markers.deleted}${key}: ${oldVal}\n${currentIndent}${markers.added}${key}: ${newVal}`;
        case 'nested':
          return `${currentIndent}${markers.unchanged}${key}: ${iter(children, nestedDepth)}`;
        default:
          return `${currentIndent}${markers.unchanged}${key}: ${val}`;
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};
