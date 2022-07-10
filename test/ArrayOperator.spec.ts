import { ArrayOperator } from '@/model/classes'

describe('ArrayOperator', () => {
  test('checkLengthByIndex', () => {
    const input = [1, 2, 3]

    expect(ArrayOperator.checkLengthByIndex(input, 1)).toBeTruthy()
    expect(ArrayOperator.checkLengthByIndex(input, 5)).toBeFalsy()
  })
})
