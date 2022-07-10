import buildTree from './build-tree.js';
import format from './formatters/index.js';
import parseData from './parsers.js';
import { readFile, getDataFormat } from './utils.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const dataFormat1 = getDataFormat(filepath1);
  const dataFormat2 = getDataFormat(filepath2);

  const parsedData1 = parseData(data1, dataFormat1);
  const parsedData2 = parseData(data2, dataFormat2);

  const diff = buildTree(parsedData1, parsedData2);

  return format(diff, formatName);
};

export default genDiff;
