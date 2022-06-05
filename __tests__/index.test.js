import fs from 'fs';
import path, { dirname } from 'path';
import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

test('genDiff', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('expected_file.txt'));
});
