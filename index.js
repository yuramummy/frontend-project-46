import fs from 'node:fs';
import _ from 'lodash';
import path from 'node:path';

const getString = (arr) => { // функция для отображения финальной строки
  const result = [];
  arr.map((element) => {
    switch (element.type) {
      case 'added':
        result.push(`  + ${element.name}: ${element.value}`);
        break;
      case 'deleted':
        result.push(`  - ${element.name}: ${element.value}`);
        break;
      case 'changed':
        result.push(`  - ${element.name}: ${element.deletedValue}`);
        result.push(`  + ${element.name}: ${element.addedValue}`);
        break;
      default:
        result.push(`    ${element.name}: ${element.value}`);
    }
    return result;
  });
  return (`{\n${result.join('\n')}\n}`);
};

const genDiff = (filepath1, filepath2) => {
  const file1 = path.resolve(process.cwd(), filepath1); // строим абсолютный путь до первого файла
  const file2 = path.resolve(process.cwd(), filepath2); // строим абсолютный путь до второго файла

  const obj1 = JSON.parse(fs.readFileSync(file1)); // читаем и парсим первый файл
  const obj2 = JSON.parse(fs.readFileSync(file2)); // читаем и парсим второй файл

  const arr1 = Object.entries(obj1); // формируем массив из первого объекта
  const arr2 = Object.entries(obj2); // формируем массив из второго объекта

  const objects = _.union(arr1, arr2); // объдиняем данные из двух массивов в один
  // сортируем ключи по имени и оставляем уникальные значения
  const sorted = _.uniqWith(_.sortBy(objects), _.isEqual);
  const result = [];

  sorted.map(([key, val]) => { // проходим по отсортированному массиву функцией map
    if (!Object.hasOwn(obj1, key)) {
      // заполняем результирующий массив объектами с данными
      result.push({ name: key, type: 'added', value: val });
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({ name: key, type: 'deleted', value: val });
    } else if (obj1[key] !== obj2[key]) {
      result.push({
        name: key, type: 'changed', deletedValue: obj1[key], addedValue: obj2[key],
      });
    } else {
      result.push({ name: key, type: 'unchanged', value: val });
    }
    return result;
  });
  // пропускаем уникальные значения result через функцию getString для получения строки
  return getString(_.uniqWith(result, _.isEqual));
};

export default genDiff;
