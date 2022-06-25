import _ from 'lodash';

const buildTree = (currentData1, currentData2) => {
  const keys1 = Object.keys(currentData1);
  const keys2 = Object.keys(currentData2);

  const uniqueKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniqueKeys);

  const nodes = sortedKeys.map((key) => {
    const currentValue1 = currentData1[key];
    const currentValue2 = currentData2[key];

    if (!_.has(currentData1, key)) {
      return { key, status: 'added', value: currentValue2 };
    }
    if (!_.has(currentData2, key)) {
      return { key, status: 'deleted', value: currentValue1 };
    }
    if (_.isPlainObject(currentValue1) && _.isPlainObject(currentValue2)) {
      const children = buildTree(currentValue1, currentValue2);
      return {
        key, status: 'nested', children,
      };
    }
    if (!_.isEqual(currentValue1, currentValue2)) {
      return {
        key, status: 'changed', oldValue: currentValue1, newValue: currentValue2,
      };
    }

    return { key, status: 'unchanged', value: currentValue2 };
  });

  return nodes;
};

export default buildTree;
