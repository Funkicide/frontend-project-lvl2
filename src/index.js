import buildTree from './build-tree.js';
import format from './formatters/index.js';
import parseData from './parsers.js';
import { readFile, getFileExt } from './utils.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileExt1 = getFileExt(filepath1);
  const fileExt2 = getFileExt(filepath2);

  const parsedData1 = parseData(data1, fileExt1);
  const parsedData2 = parseData(data2, fileExt2);

  const diff = buildTree(parsedData1, parsedData2);

  return format(diff, formatName);
};

export default genDiff;
