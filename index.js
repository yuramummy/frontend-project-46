import { readFileSync } from 'node:fs';
import parse from './src/parser.js';
import getDiff from './src/get-diff.js';
import getString from './src/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = readFileSync(filepath1, 'utf-8'); // читаем первый файл
  const data2 = readFileSync(filepath2, 'utf-8'); // читаем второй файл

  // парсим данные из файла на основе его расширения с помощью функции parse
  // результаты полученных объектов присваиваем переменным
  const obj1 = parse(data1, filepath1.split('.')[1]);
  const obj2 = parse(data2, filepath2.split('.')[1]);

  return getString(getDiff(obj1, obj2));
};

export default genDiff;
