export interface ITableCellParameters {
  class?: string
  colspan?: number
  rowspan?: number
  showSlot?: boolean
}

export interface ITableCell extends ITableCellParameters {
  value: any
  text: string
}
