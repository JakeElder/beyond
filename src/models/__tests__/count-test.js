import { canBeIncremented } from '../count'

test('canBeIncremented returns a promise', () => {
  const result = canBeIncremented()
  expect(result).toBeInstanceOf(Promise)
})
