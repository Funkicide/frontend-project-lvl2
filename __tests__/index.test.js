import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

test('genDiff with shallow .json files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toMatch(readFile('expected_file.txt'));
});

test('genDiff with shallow .yaml files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toMatch(readFile('expected_file.txt'));
});
