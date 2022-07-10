import { ITableCell } from '@/model/interfaces'
import { Converter } from '@/model/classes'

export const DEFAULT_TABLE_CELL = (): ITableCell =>
  Converter.cloneData({
    text: '',
    value: undefined
  }) as ITableCell
