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
        key, status, value, oldValue, newValue,
      } = node;

      if (status === 'added') {
        const marker = '+ ';

        const val = _.isObject(value) ? iter(value, depth + 2) : value;

        return `${currentIndent}${marker}${key}: ${val}`;
      }
      if (status === 'deleted') {
        const marker = '- ';

        const val = _.isObject(value) ? iter(value, depth + 2) : value;

        return `${currentIndent}${marker}${key}: ${val}`;
      }
      if (status === 'changed') {
        const marker1 = '- ';
        const marker2 = '+ ';

        const oldVal = _.isObject(oldValue)
          ? iter(oldValue, depth + 2)
          : oldValue;
        const newVal = _.isObject(newValue)
          ? iter(newValue, depth + 2)
          : newValue;

        return `${currentIndent}${marker1}${key}: ${oldVal}\n${currentIndent}${marker2}${key}: ${newVal}`;
      }

      const marker = '  ';
      const val = _.isObject(value) ? iter(value, depth + 2) : value;

      return `${currentIndent}${marker}${key}: ${val}`;
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(diff, 1);
};
