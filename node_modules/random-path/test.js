import assert from 'node:assert'
import randomPath, { validateTemplate } from './index.js'

/* Invalid templates */
assert.throws(function () {
  randomPath('/tmp', 'bad template')
})

assert.throws(function () {
  randomPath('/tmp', 'one: %s, two: %s')
})

assert.throws(function () {
  randomPath('/tmp', [1, 2])
})

assert.throws(function () {
  validateTemplate('bad template')
})

assert.throws(function () {
  validateTemplate('one: %s, two: %s')
})

assert.throws(function () {
  validateTemplate([1, 2])
})

/* Valid templates */
validateTemplate('%s')
validateTemplate('%s.txt')
validateTemplate('test-%s')
validateTemplate('test-%s.exe')
validateTemplate('random => %s')

/* Valid path */
const a = randomPath('/tmp', 'test-%s.txt')
const b = randomPath('/tmp', 'test-%s.txt')
const c = randomPath('/tmp', 'test-%s.txt')

assert.notStrictEqual(a, b)
assert.notStrictEqual(a, c)
assert.notStrictEqual(b, c)

assert.ok(/tmp[\\/]test-[0-9A-Z]{7}\.txt$/.test(a))
assert.ok(/tmp[\\/]test-[0-9A-Z]{7}\.txt$/.test(b))
assert.ok(/tmp[\\/]test-[0-9A-Z]{7}\.txt$/.test(c))
