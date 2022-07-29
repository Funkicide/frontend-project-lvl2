import _ from 'lodash';

const buildTree = (data1, data2) => {
  const uniqueKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(uniqueKeys);

  const nodes = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, status: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, status: 'deleted', value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key, status: 'nested', children: buildTree(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key, status: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }

    return { key, status: 'unchanged', value: data2[key] };
  });

  return nodes;
};

export default buildTree;
