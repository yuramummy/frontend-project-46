import _ from 'lodash';

const getDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1); // формируем массив ключей первого объекта
  const keys2 = Object.keys(obj2); // формируем массив ключей второго объекта

  const combainedKeys = _.union(keys1, keys2); // формируем массив уникальных ключей
  const sorted = _.sortBy(combainedKeys); // сортируем массив

  const result = sorted.map((key) => {
    const value1 = obj1[key]; // находим значение первого объекта
    const value2 = obj2[key]; // находим значение второго ключа

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'parent', key, children: getDiff(value1, value2) };
    }
    // если массив первых ключей не содержит текущее значение
    // возвращаем объект с типом 'added' и значением второго ключа
    if (!keys1.includes(key)) {
      return { type: 'added', key, value: value2 };
    }
    if (!keys2.includes(key)) {
      return { type: 'deleted', key, value: value1 };
    }
    if (value1 !== value2) {
      return {
        type: 'changed', key, deletedValue: value1, addedValue: value2,
      };
    }
    return { type: 'unchanged', key, value: value1 };
  });

  return result;
};

export default getDiff;
