import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(absolutePath, 'utf-8');

  return data;
};
const getDataFormat = (filepath) => path.extname(filepath).slice(1);

export { readFile, getDataFormat };
