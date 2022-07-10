export default class Converter {
  /**
   * Метод клонирует массив или объект в новую ячейку памяти
   */
  static cloneData(data: any[] | { [key: string]: any }): any[] | { [key: string]: any } {
    return JSON.parse(JSON.stringify(data))
  }

  /**
   * Метод делит содержимое массива на массивы (чанки) указанной длины
   */
  static chunkArray(arrayToChunk: any[], chunkSize: number): any[][] {
    if (chunkSize <= 0) {
      throw new Error('размер чанка должен быть больше 0')
    }

    const result = []

    for (let i = 0; i < arrayToChunk.length; i += chunkSize) {
      const chunk = arrayToChunk.slice(i, i + chunkSize)
      result.push(chunk)
    }

    return result
  }

  /**
   * Метод наполняет массив значениями undefined от последнего элемента до указанного индекса массива
   */
  static fillArrayByUndefined(array: any[], index: number): any[] {
    const result = Converter.cloneData(array) as any[]

    if (result.length) {
      for (let i = index; i > array.length - 1; i--) {
        result[i] = undefined
      }
    }

    return result
  }
}
