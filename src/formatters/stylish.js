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
      } = node;

      const markers = {
        added: '+ ',
        deleted: '- ',
        unchanged: '  ',
      };

      if (status === 'added') {
        const val = _.isObject(value) ? iter(value, depth + 2) : value;

        return `${currentIndent}${markers.added}${key}: ${val}`;
      }
      if (status === 'deleted') {
        const val = _.isObject(value) ? iter(value, depth + 2) : value;

        return `${currentIndent}${markers.deleted}${key}: ${val}`;
      }
      if (status === 'changed') {
        const oldVal = _.isObject(oldValue)
          ? iter(oldValue, depth + 2)
          : oldValue;
        const newVal = _.isObject(newValue)
          ? iter(newValue, depth + 2)
          : newValue;

        return `${currentIndent}${markers.deleted}${key}: ${oldVal}\n${currentIndent}${markers.added}${key}: ${newVal}`;
      }

      const val = _.isObject(value) ? iter(value, depth + 2) : value;

      return `${currentIndent}${markers.unchanged}${key}: ${val}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};
