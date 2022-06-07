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

  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);

  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.reduce((acc, key) => {
    let str = acc;
    if (!Object.hasOwn(parsedData1, key)) {
      str += `  + ${key}: ${parsedData2[key]}\n`;
    } else if (!Object.hasOwn(parsedData2, key)) {
      str += `  - ${key}: ${parsedData1[key]}\n`;
    } else if (parsedData1[key] !== parsedData2[key]) {
      str += `  - ${key}: ${parsedData1[key]}\n`;
      str += `  + ${key}: ${parsedData2[key]}\n`;
    } else {
      str += `    ${key}: ${parsedData1[key]}\n`;
    }

    return str;
  }, '');
  const result = `{\n${diff}}`;

  return result;
};

export default genDiff;
