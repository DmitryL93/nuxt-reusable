export default class Monad {
  private value: any

  constructor(value: any) {
    this.value = value
  }

  run(fn: Function): Monad {
    return new Monad(fn(this.value))
  }

  getValue() {
    return this.value
  }
}
