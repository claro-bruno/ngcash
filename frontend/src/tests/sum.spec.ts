import { sum } from './sum'
import { it, expect } from 'vitest'

it('suming 5 + 2 will return 7', () => {
  expect(sum(5, 2)).toBe(7)
})
