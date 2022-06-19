import buildTree from './build-tree.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const diff = buildTree(filepath1, filepath2);
  return format(diff, formatName);
};

export default genDiff;
