import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

test('stylish output .json files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toMatch(readFile('expected_file_stylish.txt'));
});

test('stylish output .yaml files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toMatch(readFile('expected_file_stylish.txt'));
});

test('plain output .json files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toMatch(readFile('expected_file_plain.txt'));
});
test('plain output .yaml files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toMatch(readFile('expected_file_plain.txt'));
});
test('json output .json files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toMatch(readFile('expected_file_json.txt'));
});
test('json output .yaml files', () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const readFile = (filepath) => fs.readFileSync(getFixturePath(filepath), 'utf-8');

  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toMatch(readFile('expected_file_json.txt'));
});
