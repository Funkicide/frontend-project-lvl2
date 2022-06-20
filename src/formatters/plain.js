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
        key, status, value, oldValue, newValue, children,
      } = node;
      const currentPropertyName = [...ancestry, key].join('.');

      const val = selectValueType(value);
      const oldVal = selectValueType(oldValue);
      const newVal = selectValueType(newValue);

      switch (status) {
        case 'added':
          return `Property '${currentPropertyName}' was added with value: ${val}`;
        case 'deleted':
          return `Property '${currentPropertyName}' was removed`;
        case 'changed':
          return `Property '${currentPropertyName}' was updated. From ${oldVal} to ${newVal}`;
        case 'nested':
          return iter(children, [...ancestry, key]);
        default:
          return [];
      }
    });

    return [...lines].join('\n');
  };

  return iter(diff, []);
};
