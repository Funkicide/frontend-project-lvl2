import _ from 'lodash';

export default (diff) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spacesCount = 2;

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentValue.map((node) => {
      const {
        key,
        status,
        value,
        oldValue,
        newValue,
        children,
      } = node;

      const markers = {
        added: '+ ',
        deleted: '- ',
        unchanged: '  ',
      };

      const val = _.isObject(value) ? iter(value, depth + 2) : value;
      const oldVal = _.isObject(oldValue)
        ? iter(oldValue, depth + 2)
        : oldValue;
      const newVal = _.isObject(newValue)
        ? iter(newValue, depth + 2)
        : newValue;

      switch (status) {
        case 'added':
          return `${currentIndent}${markers.added}${key}: ${val}`;
        case 'deleted':
          return `${currentIndent}${markers.deleted}${key}: ${val}`;
        case 'changed':
          return `${currentIndent}${markers.deleted}${key}: ${oldVal}\n${currentIndent}${markers.added}${key}: ${newVal}`;
        case 'nested':
          return `${currentIndent}${markers.unchanged}${key}: ${iter(children, depth + 2)}`;
        default:
          return `${currentIndent}${markers.unchanged}${key}: ${val}`;
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};
