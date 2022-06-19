/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import _ from 'lodash';
import parseData from './parsers.js';
import { readFile, getFileExt } from './utils.js';

export default (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileExt1 = getFileExt(filepath1);
  const fileExt2 = getFileExt(filepath2);

  const parsedData1 = parseData(data1, fileExt1);
  const parsedData2 = parseData(data2, fileExt2);

  const iter = (currentData1, currentData2) => {
    const keys1 = Object.keys(currentData1);
    const keys2 = Object.keys(currentData2);

    const keys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(keys);

    const nodes = sortedKeys.map((key) => {
      const currentValue1 = currentData1[key];
      const currentValue2 = currentData2[key];

      if (!_.has(currentData1, key)) {
        const value = _.isObject(currentValue2)
          ? iter(currentValue2, currentValue2) : currentValue2;
        return { key, status: 'added', value };
      }
      if (!_.has(currentData2, key)) {
        const value = _.isObject(currentValue1)
          ? iter(currentValue1, currentValue1) : currentValue1;
        return { key, status: 'deleted', value };
      }
      if (currentValue1 === currentValue2) {
        const value = _.isObject(currentValue2)
          ? iter(currentValue2, currentValue2) : currentValue2;
        return { key, status: 'unchanged', value };
      }
      if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
        const value = iter(currentValue1, currentValue2);
        return {
          key, status: 'nested', value,
        };
      }
      if (currentValue1 !== currentValue2) {
        const oldValue = _.isObject(currentValue1)
          ? iter(currentValue1, currentValue1) : currentValue1;
        const newValue = _.isObject(currentValue2)
          ? iter(currentValue2, currentValue2) : currentValue2;
        return {
          key, status: 'changed', oldValue, newValue,
        };
      }
    });

    return nodes;
  };
  const tree = iter(parsedData1, parsedData2);

  return tree;
};