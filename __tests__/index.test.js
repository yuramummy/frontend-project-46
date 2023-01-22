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

const resultJSON = readFile('resultJSON.txt');

test('difference JSON files', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(resultJSON);
});
