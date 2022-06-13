import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  return data;
};
const getFileExt = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileExt1 = getFileExt(filepath1);
  const fileExt2 = getFileExt(filepath2);

  const parsedData1 = parseData(data1, fileExt1);
  const parsedData2 = parseData(data2, fileExt2);

  const iter = (currentData1, currentData2) => {
    if (!_.isObject(currentData1)) {
      return String(currentData1);
    }
    if (!_.isObject(currentData2)) {
      return String(currentData2);
    }
    const keys1 = Object.keys(currentData1);
    const keys2 = Object.keys(currentData2);

    const keys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(keys);

    const diff = sortedKeys
      .map((key) => {
        const currentValue1 = currentData1[key];
        const currentValue2 = currentData2[key];

        if (!Object.hasOwn(currentData1, key)) {
          return { name: key, status: 'added', value: currentValue2 };
        }
        if (!Object.hasOwn(currentData2, key)) {
          return { name: key, status: 'deleted', value: currentValue1 };
        }
        if (currentValue1 === currentValue2) {
          return { name: key, status: 'unchanged', value: currentValue2 };
        }
        if (_.isObject(currentValue1) && !_.isObject(currentValue2)) {
          return {
            name: key, status: 'changed', oldValue: currentValue1, newValue: currentValue2,
          };
        }
        if (!_.isObject(currentValue1) && _.isObject(currentValue2)) {
          return {
            name: key, status: 'changed', oldValue: currentValue1, newValue: currentValue2,
          };
        }
        if (!_.isObject(currentValue1) && !_.isObject(currentValue2)) {
          return {
            name: key, status: 'changed', oldValue: currentValue1, newValue: currentValue2,
          };
        }
        if (_.isObject(currentValue1) && _.isObject(currentValue2)) {
          return { name: key, type: 'nested', value: iter(currentValue1, currentValue2) };
        }
      });

    return diff;
  };

  return iter(parsedData1, parsedData2);
};

export default genDiff;
