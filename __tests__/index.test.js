import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const getAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
  const readFile = (filepath) => fs.readFileSync(getAbsolutePath(filepath), 'utf-8');

  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('__fixtures__/expected_file.txt'));
});
