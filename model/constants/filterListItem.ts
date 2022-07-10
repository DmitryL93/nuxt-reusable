import { IFilterListItem } from '@/model/interfaces'
import { Converter } from '@/model/classes'

export const DEFAULT_LIST_ITEM = (): IFilterListItem =>
  Converter.cloneData({
    name: '',
    value: undefined,
    checked: true
  }) as IFilterListItem
