import { Monad } from '@/model/classes'

describe('Monad', () => {
  test('execute chain', () => {
    const addFive = (a: number): number => a + 5
    const mathOperation = (a: number, b: number, c: number): number => a + b - c

    const input = 5
    const output = 0

    expect(new Monad(input).run(addFive).run(mathOperation.bind(undefined, 8, 2)).getValue()).toStrictEqual(output)
  })
})
