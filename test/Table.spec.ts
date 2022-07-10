import { Table } from '@/model/classes'
import { DEFAULT_TABLE_CELL } from '@/model/constants'

describe('CTable', () => {
  test('createTableCell', () => {
    const input = {
      text: 'текст ячейки',
      value: {
        id: 1
      },
      parameters: {
        class: 'class-name',
        colspan: 2,
        rowspan: 3,
        showSlot: true
      }
    }
    const output = {
      text: input.text,
      value: {
        id: 1
      },
      class: 'class-name',
      colspan: 2,
      rowspan: 3,
      showSlot: true
    }

    expect(Table.createTableCell(input.text, input.value, input.parameters)).toStrictEqual(output)
    expect(Table.createTableCell()).toStrictEqual(DEFAULT_TABLE_CELL())
  })

  test('sortColumn', () => {
    const input = {
      table: [
        [
          { text: 'C', value: '' },
          { text: '1', value: '' }
        ],
        [
          { text: 'A', value: '' },
          { text: '2', value: '' }
        ],
        [
          { text: 'D', value: '' },
          { text: '3', value: '' }
        ],
        [
          { text: 'B', value: '' },
          { text: '4', value: '' }
        ]
      ],
      columnIndex: 0
    }
    const ascOutput = [
      [
        { text: 'A', value: '' },
        { text: '2', value: '' }
      ],
      [
        { text: 'B', value: '' },
        { text: '4', value: '' }
      ],
      [
        { text: 'C', value: '' },
        { text: '1', value: '' }
      ],
      [
        { text: 'D', value: '' },
        { text: '3', value: '' }
      ]
    ]
    const descOutput = [
      [
        { text: 'D', value: '' },
        { text: '3', value: '' }
      ],
      [
        { text: 'C', value: '' },
        { text: '1', value: '' }
      ],
      [
        { text: 'B', value: '' },
        { text: '4', value: '' }
      ],
      [
        { text: 'A', value: '' },
        { text: '2', value: '' }
      ]
    ]

    expect(Table.sortColumn(input.columnIndex, undefined, input.table)).toStrictEqual(ascOutput)
    expect(Table.sortColumn(input.columnIndex, 'asc', input.table)).toStrictEqual(ascOutput)
    expect(Table.sortColumn(input.columnIndex, 'desc', input.table)).toStrictEqual(descOutput)
  })

  test('sortRow', () => {
    const input = {
      table: [
        [
          { text: 'C', value: '1' },
          { text: 'A', value: '2' },
          { text: 'D', value: '3' },
          { text: 'B', value: '4' }
        ],
        [
          { text: 'a1', value: '1' },
          { text: 'a2', value: '2' },
          { text: 'a3', value: '3' },
          { text: 'a4', value: '4' }
        ],
        [
          { text: 'b1', value: '1' },
          { text: 'b2', value: '2' },
          { text: 'b3', value: '3' },
          { text: 'b4', value: '4' }
        ]
      ],
      rowIndex: 0
    }
    const ascOutput = [
      [
        { text: 'A', value: '2' },
        { text: 'B', value: '4' },
        { text: 'C', value: '1' },
        { text: 'D', value: '3' }
      ],
      [
        { text: 'a2', value: '2' },
        { text: 'a4', value: '4' },
        { text: 'a1', value: '1' },
        { text: 'a3', value: '3' }
      ],
      [
        { text: 'b2', value: '2' },
        { text: 'b4', value: '4' },
        { text: 'b1', value: '1' },
        { text: 'b3', value: '3' }
      ]
    ]
    const descOutput = [
      [
        { text: 'D', value: '3' },
        { text: 'C', value: '1' },
        { text: 'B', value: '4' },
        { text: 'A', value: '2' }
      ],
      [
        { text: 'a3', value: '3' },
        { text: 'a1', value: '1' },
        { text: 'a4', value: '4' },
        { text: 'a2', value: '2' }
      ],
      [
        { text: 'b3', value: '3' },
        { text: 'b1', value: '1' },
        { text: 'b4', value: '4' },
        { text: 'b2', value: '2' }
      ]
    ]

    expect(Table.sortRow(input.rowIndex, undefined, input.table)).toStrictEqual(ascOutput)
    expect(Table.sortRow(input.rowIndex, 'asc', input.table)).toStrictEqual(ascOutput)
    expect(Table.sortRow(input.rowIndex, 'desc', input.table)).toStrictEqual(descOutput)
  })

  test('cloneColumn', () => {
    const input = {
      table: [
        [
          { text: 'A', value: '' },
          { text: '1', value: '' }
        ],
        [
          { text: 'B', value: '' },
          { text: '2', value: '' }
        ],
        [
          { text: 'C', value: '' },
          { text: '3', value: '' }
        ]
      ],
      columnIndex: 1
    }
    const output = [[{ text: '1', value: '' }], [{ text: '2', value: '' }], [{ text: '3', value: '' }]]

    expect(Table.cloneColumn(input.columnIndex, input.table)).toStrictEqual(output)
  })

  test('shiftColumn', () => {
    const input = [
      [
        { text: 'A', value: '' },
        { text: '1', value: '' }
      ],
      [
        { text: 'B', value: '' },
        { text: '2', value: '' }
      ],
      [
        { text: 'C', value: '' },
        { text: '3', value: '' }
      ]
    ]
    const output = [[{ text: '1', value: '' }], [{ text: '2', value: '' }], [{ text: '3', value: '' }]]

    expect(Table.shiftColumn(input)).toStrictEqual(output)
  })

  test('unshiftColumn', () => {
    const input = {
      table: [[{ text: '1', value: '' }], [{ text: '2', value: '' }], [{ text: '3', value: '' }]],
      column: [[{ text: 'A', value: '' }], [{ text: 'B', value: '' }], [{ text: 'C', value: '' }]]
    }
    const output = [
      [
        { text: 'A', value: '' },
        { text: '1', value: '' }
      ],
      [
        { text: 'B', value: '' },
        { text: '2', value: '' }
      ],
      [
        { text: 'C', value: '' },
        { text: '3', value: '' }
      ]
    ]

    expect(Table.unshiftColumn(input.column, input.table)).toStrictEqual(output)
  })
})
