import _ from 'lodash';

const formatStylish = (value) => {
  const iter = (currentValue, depth) => {
    const replacer = ' ';
    const spacesCount = 2;
    const nestedSpacesCount = spacesCount + 1;

    const currentIndent = depth * spacesCount;
    const bracketIndent = currentIndent - spacesCount;
    const currentNestedIndent = depth * nestedSpacesCount;

    const indentSize = replacer.repeat(currentIndent);
    const nestedIndentSize = replacer.repeat(currentNestedIndent);

    const lines = currentValue
      .map((key) => {
        console.log(key);
        if (key.status === 'added' && !_.isObject(key.value)) {
          const sign = '+';
          return `${indentSize}${sign} ${key.name}: ${key.value}`;
        }
        if (key.status === 'deleted' && !_.isObject(key.value)) {
          const sign = '-';
          return `${indentSize}${sign} ${key.name}: ${key.value}`;
        }
        if (key.status === 'changed') {
          const sign1 = '-';
          const sigh2 = '+';

          const oldValue = _.isObject(key.value) ? iter(key.oldValue, depth + 1) : key.oldValue;
          const newValue = _.isObject(key.value) ? iter(key.newValue, depth + 1) : key.newValue;

          return `${indentSize}${sign1} ${key.name}: ${oldValue}\n${indentSize}${sigh2} ${key.name}: ${newValue}`;
        }
        if (key.type === 'nested') {
          return `${nestedIndentSize}${key.name}: ${iter(key.value, depth + 1)}`;
        }

        return `${nestedIndentSize}${key.name}: ${key.value}`;
      });

    return ['{', ...lines, `${replacer.repeat(bracketIndent)}}`].join('\n');
  };

  return iter(value, 1);
};

export default formatStylish;
