import { FilterList } from '@/model/classes'
import { DEFAULT_LIST_ITEM } from '@/model/constants'

describe('FilterList', () => {
  test('createItem', () => {
    const input = {
      name: 'имя элемента списка',
      value: { key: 'value' },
      checked: true
    }
    const output = {
      name: 'имя элемента списка',
      value: { key: 'value' },
      checked: true
    }

    expect(FilterList.createItem(input.name, input.value, input.checked)).toStrictEqual(output)
    expect(FilterList.createItem()).toEqual(DEFAULT_LIST_ITEM())
  })

  test('sortItems', () => {
    const input = [
      {
        name: 'C',
        value: '',
        checked: true
      },
      {
        name: 'A',
        value: '',
        checked: true
      },
      {
        name: 'D',
        value: '',
        checked: true
      },
      {
        name: 'B',
        value: '',
        checked: true
      }
    ]
    const ascOutput = [
      {
        name: 'A',
        value: '',
        checked: true
      },
      {
        name: 'B',
        value: '',
        checked: true
      },
      {
        name: 'C',
        value: '',
        checked: true
      },
      {
        name: 'D',
        value: '',
        checked: true
      }
    ]
    const descOutput = [
      {
        name: 'D',
        value: '',
        checked: true
      },
      {
        name: 'C',
        value: '',
        checked: true
      },
      {
        name: 'B',
        value: '',
        checked: true
      },
      {
        name: 'A',
        value: '',
        checked: true
      }
    ]

    expect(FilterList.sortItems(undefined, input)).toStrictEqual(ascOutput)
    expect(FilterList.sortItems('asc', input)).toStrictEqual(ascOutput)
    expect(FilterList.sortItems('desc', input)).toStrictEqual(descOutput)
  })
})
