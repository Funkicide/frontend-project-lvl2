import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const parseFile = (filepath) => JSON.parse(fs.readFileSync(getAbsolutePath(filepath), 'utf-8'));

const genDiff = (file1, file2) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.reduce((acc, key) => {
    let str = acc;
    if (!Object.hasOwn(data1, key)) {
      str += `  + ${key}: ${data2[key]}\n`;
    } else if (!Object.hasOwn(data2, key)) {
      str += `  - ${key}: ${data1[key]}\n`;
    } else if (data1[key] !== data2[key]) {
      str += `  - ${key}: ${data1[key]}\n`;
      str += `  + ${key}: ${data2[key]}\n`;
    } else {
      str += `    ${key}: ${data1[key]}\n`;
    }

    return str;
  }, '');

  return `{\n${result}}`;
};

export default genDiff;
