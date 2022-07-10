import { DEFAULT_TABLE_CELL } from '@/model/constants'
import { ITableCell, ITableCellParameters } from '@/model/interfaces'
import { ArrayOperator, Converter } from '@/model/classes'

export default class Table {
  /**
   * Mетод создает ячейку таблицы
   */
  static createTableCell(
    text: ITableCell['text'] = '',
    value: ITableCell['value'] = undefined,
    parameters: ITableCellParameters = {}
  ): ITableCell {
    const cell = DEFAULT_TABLE_CELL()

    if (text) {
      cell.text = text
    }

    if (value) {
      cell.value = value
    }

    if ('class' in parameters) {
      cell.class = parameters.class
    }

    if ('colspan' in parameters) {
      cell.colspan = parameters.colspan
    }

    if ('rowspan' in parameters) {
      cell.rowspan = parameters.rowspan
    }

    if ('showSlot' in parameters) {
      cell.showSlot = parameters.showSlot
    }

    return cell
  }

  /**
   * Метод сортирует столбец таблицы
   */
  static sortColumn(columnIndex: number, direction: 'asc' | 'desc' = 'asc', table: ITableCell[][]): ITableCell[][] {
    const result: ITableCell[][] = []
    let columnValuesToSort: string[] = []

    for (let i = 0; i < table.length; i++) {
      columnValuesToSort.push(table[i][columnIndex].text)
    }

    if (direction === 'asc') {
      columnValuesToSort = ArrayOperator.sortAsc(columnValuesToSort) as string[]
    } else {
      columnValuesToSort = ArrayOperator.sortDesc(columnValuesToSort) as string[]
    }

    for (let i = 0; i < table.length; i++) {
      for (let j = 0; j < columnValuesToSort.length; j++) {
        if (table[i][columnIndex].text === columnValuesToSort[j]) {
          result.push(table[j])
        }
      }
    }

    return result.reverse()
  }

  /**
   * Метод сортирует строку таблицы
   */
  static sortRow(rowIndex: number, direction: 'asc' | 'desc' = 'asc', table: ITableCell[][]): ITableCell[][] {
    const result: ITableCell[][] = []
    let rowValuesToSort: string[] = []
    let rowValuesAfterSort: string[] = []
    const sortedRowIndexes: number[] = []

    for (let i = 0; i < table[rowIndex].length; i++) {
      rowValuesToSort.push(table[rowIndex][i].text)
    }

    if (direction === 'asc') {
      rowValuesAfterSort = ArrayOperator.sortAsc(rowValuesToSort) as string[]
    } else {
      rowValuesAfterSort = ArrayOperator.sortDesc(rowValuesToSort) as string[]
    }

    rowValuesToSort = []

    for (let i = 0; i < table[rowIndex].length; i++) {
      rowValuesToSort.push(table[rowIndex][i].text)
    }

    for (let i = 0; i < rowValuesToSort.length; i++) {
      sortedRowIndexes.push(rowValuesAfterSort.indexOf(rowValuesToSort[i]))
    }

    for (let i = 0; i < table.length; i++) {
      result.push([])

      for (let j = 0; j < sortedRowIndexes.length; j++) {
        result[i].push(table[i][sortedRowIndexes[j]])
      }

      result[i].reverse()
    }

    return result
  }

  /**
   * Метод клонирует колонку таблицы
   */
  static cloneColumn(columnIndex: number, table: ITableCell[][]): ITableCell[][] {
    const result: ITableCell[][] = []

    for (let i = 0; i < table.length; i++) {
      result.push([{ ...table[i][columnIndex] }])
    }

    return result
  }

  /**
   * Метод срезает первую колонку таблицы
   */
  static shiftColumn(table: ITableCell[][]): ITableCell[][] {
    const result: ITableCell[][] = Converter.cloneData(table) as ITableCell[][]

    for (let i = 0; i < result.length; i++) {
      if (result[i].length) {
        result[i].shift()
      }
    }

    return result
  }

  /**
   * Метод добавляет колонку в начало таблицы
   */
  static unshiftColumn(column: ITableCell[][], table: ITableCell[][]): ITableCell[][] {
    const result: ITableCell[][] = Converter.cloneData(table) as ITableCell[][]

    for (let i = 0; i < result.length; i++) {
      result[i].unshift({ ...column[i][0] })
    }

    return result
  }
}
