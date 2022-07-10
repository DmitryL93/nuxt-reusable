import { Converter } from '@/model/classes'

export default class ArrayOperator {
  /**
   * Метод проверяет наличие элемента в массиве по индексу
   */
  static checkLengthByIndex(array: any[], index: number): boolean {
    if (array.length && array[index]) {
      return true
    } else {
      return false
    }
  }

  /**
   * Метод сортирует массив по возрастанию
   */
  static sortAsc(array: (string | number)[]): (string | number)[] {
    return Converter.cloneData(array.sort()) as (string | number)[]
  }

  /**
   * Метод сортирует массив по убыванию
   */
  static sortDesc(array: (string | number)[]): (string | number)[] {
    return Converter.cloneData(array.sort().reverse()) as (string | number)[]
  }
}
