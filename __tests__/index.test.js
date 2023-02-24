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

const extensions = ['json', 'yml'];

test.each([extensions])('main test', (extension) => {
  const filePath1 = getFixturePath(`file1.${extension}`);
  const filePath2 = getFixturePath(`file2.${extension}`);

  expect(genDiff(filePath1, filePath2)).toBe(resultStylish);
  expect(genDiff(filePath1, filePath2, 'plain')).toBe(resultPlain);
  expect(genDiff(filePath1, filePath2, 'json')).toBe(resultJSON);
});
