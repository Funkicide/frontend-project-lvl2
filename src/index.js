/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';
import formatStylish from './formatters.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  return data;
};
const getFileExt = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, format = formatStylish) => {
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

    const diff = sortedKeys.map((key) => {
      const currentValue1 = currentData1[key];
      const currentValue2 = currentData2[key];

      if (!Object.hasOwn(currentData1, key)) {
        const value = _.isObject(currentValue2)
          ? iter(currentValue2, currentValue2) : currentValue2;
        return { key, status: 'added', value };
      }
      if (!Object.hasOwn(currentData2, key)) {
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
        const status = 'nested';
        const value = iter(currentValue1, currentValue2);
        return {
          key, status, value,
        };
      }
      if (currentValue1 !== currentValue2) {
        const oldValue = _.isObject(currentValue1)
          ? iter(currentValue1, currentValue1) : currentValue1;
        const newValue = _.isObject(currentValue2)
          ? iter(currentValue2, currentValue2) : currentValue2;
        const status = 'changed';
        return {
          key, status, oldValue, newValue,
        };
      }
    });

    return diff;
  };
  const diff = iter(parsedData1, parsedData2);

  return format(diff);
};

export default genDiff;
