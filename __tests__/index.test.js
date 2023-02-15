import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => {
  const filePath = getFixturePath(file);
  const data = fs.readFileSync(filePath, 'utf-8');
  return data;
};

const resultStylish = readFile('result-stylish.txt');
const resultPlain = readFile('result-plain.txt');
const resultJSON = readFile('result-json.txt');

test('JSON file test in stylish format', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(resultStylish);
});

test('YAML file test in stylish format', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(resultStylish);
});

test('JSON file test in plain format', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(resultPlain);
});

test('YAML file test in plain format', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(resultPlain);
});

test('JSON file test in JSON format', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(resultJSON);
});

test('YAML file test in JSON format', () => {
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(resultJSON);
});
