import { DEFAULT_LIST_ITEM } from '@/model/constants'
import { IFilterListItem } from '@/model/interfaces'
import { ArrayOperator } from '@/model/classes'

export default class FilterList {
  /**
   * Метод создает элемент списка
   */
  static createItem(
    name: IFilterListItem['name'] = '',
    value: IFilterListItem['value'] = undefined,
    checked: IFilterListItem['checked'] = true
  ): IFilterListItem {
    const item = DEFAULT_LIST_ITEM()

    item.name = name
    item.value = value
    item.checked = checked

    return item
  }

  static sortItems(direction: 'asc' | 'desc' = 'asc', items: IFilterListItem[]): IFilterListItem[] {
    const result: IFilterListItem[] = []
    let names: string[] = []

    for (let i = 0; i < items.length; i++) {
      names.push(items[i].name)
    }

    if (direction === 'asc') {
      names = ArrayOperator.sortAsc(names) as string[]
    } else {
      names = ArrayOperator.sortDesc(names) as string[]
    }

    for (let i = 0; i < items.length; i++) {
      for (let j = 0; j < names.length; j++) {
        if (items[i].name === names[j]) {
          result.push(items[j])
        }
      }
    }

    return result.reverse()
  }
}
