import { Converter } from '@/model/classes'

describe('Converter', () => {
  test('cloneData', () => {
    const array = [1, 2, 3]
    const object = { key: 'value' }

    expect(Converter.cloneData(array)).not.toBe(array)
    expect(Converter.cloneData(object)).not.toBe(object)
  })

  test('chunkArray', () => {
    const input = [1, 2, 3, 4, 5]
    const output = [[1, 2], [3, 4], [5]]

    expect(Converter.chunkArray(input, 2)).toStrictEqual(output)
    expect(() => Converter.chunkArray(input, 0)).toThrow('размер чанка должен быть больше 0')
    expect(() => Converter.chunkArray(input, -2)).toThrow('размер чанка должен быть больше 0')
  })

  test('fillArrayByUndefined', () => {
    const input = [1, 2, 3]
    const output = [1, 2, 3, undefined, undefined]

    expect(Converter.fillArrayByUndefined(input, 4)).toStrictEqual(output)
    expect(Converter.fillArrayByUndefined(input, 1)).toStrictEqual(input)
  })
})
