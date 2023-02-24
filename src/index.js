import { readFileSync } from 'node:fs';
import path from 'node:path';
import parse from './parser.js';
import getFormat from './formatters/index.js';
import getDiff from './get-diff.js';

const genDiff = (filepath1, filepath2, format) => {
  const data1 = readFileSync(filepath1, 'utf-8'); // читаем первый файл
  const data2 = readFileSync(filepath2, 'utf-8'); // читаем второй файл

  // парсим данные из файла на основе его расширения с помощью функции parse
  // результаты полученных объектов присваиваем переменным

  const fileExtension1 = path.extname(filepath1).slice(1); // получаем расширение файла 1
  const fileExtension2 = path.extname(filepath2).slice(1); // получаем расширение файла 2

  const obj1 = parse(data1, fileExtension1);
  const obj2 = parse(data2, fileExtension2);

  const diff = getDiff(obj1, obj2);
  return getFormat(diff, format);
};

export default genDiff;
