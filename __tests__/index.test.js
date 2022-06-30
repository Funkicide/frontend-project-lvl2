import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', test: 'expected-file-stylish.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'stylish', test: 'expected-file-stylish.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'stylish', test: 'expected-file-stylish.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'plain', test: 'expected-file-plain.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'plain', test: 'expected-file-plain.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'plain', test: 'expected-file-plain.txt',
  },
  {
    file1: 'file1.json', file2: 'file2.json', format: 'json', test: 'expected-file-json.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'json', test: 'expected-file-json.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'json', test: 'expected-file-json.txt',
  },
])('genDiff($file1, $file2, $format) matches $test', ({
  file1, file2, format, test,
}) => {
  const actual = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(test);
  expect(actual).toMatch(expected);
});
test('genDiff throws on uknown format name', () => {
  expect(() => genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'ini')).toThrow();
});
test('genDiff throws on uknown file extension', () => {
  expect(() => genDiff(getFixturePath('file.ini'), getFixturePath('file.ini'))).toThrow();
});
test('gendiff shows help with -h option', () => {
  expect(execSync('node bin/gendiff.js -h').toString()).toMatch(readFile('expected-help-text.txt'));
});
