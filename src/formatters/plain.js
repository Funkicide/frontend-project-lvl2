import _ from 'lodash';

const selectValueType = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }

  return `${value}`;
};

export default (diff) => {
  const iter = (currentValue, ancestry) => {
    const lines = currentValue.flatMap((node) => {
      const {
        key, status, value, oldValue, newValue,
      } = node;
      const currentPropertyName = [...ancestry, key].join('.');

      if (status === 'added') {
        const val = selectValueType(value);

        return `Property '${currentPropertyName}' was added with value: ${val}`;
      }
      if (status === 'deleted') {
        return `Property '${currentPropertyName}' was removed`;
      }
      if (status === 'changed') {
        const oldVal = selectValueType(oldValue);
        const newVal = selectValueType(newValue);

        return `Property '${currentPropertyName}' was updated. From ${oldVal} to ${newVal}`;
      }

      if (status === 'nested') {
        return iter(value, [...ancestry, key]);
      }

      return [];
    });
    const result = [...lines].join('\n');

    return result;
  };

  return iter(diff, []);
};
