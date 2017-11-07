import test from 'tape'
import { canBeIncremented } from './count'

test('canBeIncremented returns a promise', (t) => {
  const result = canBeIncremented()
  t.ok(result instanceof Promise)
  t.end()
})
