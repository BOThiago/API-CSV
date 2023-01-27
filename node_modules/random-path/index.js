import { join } from 'node:path'
import encodeBase32 from 'base32-encode'
import murmur32 from 'murmur-32'

export function validateTemplate (template) {
  if (typeof template !== 'string') {
    throw new TypeError('template is not a string')
  }

  const re = /(^|[^%])(%%)*%s/
  const first = re.exec(template)
  if (first === null) throw new Error('No replacement token. Template must contain replacement token %s exactly once')

  const pos = first.index + first[0].length
  const second = re.exec(template.substring(pos))
  if (second !== null) throw new Error('Multiple replacement tokens. Template must contain replacement token %s exactly once')
}

function replaceToken (template, noise) {
  return template.replace(/%([%s])/g, (_, $1) => ($1 === 's' ? noise : $1))
}

let invocations = 0
const localRandom = String(Math.random())

export default function randomPath (directory, template) {
  validateTemplate(template)

  const hash = murmur32(localRandom + String(process.pid) + String(++invocations))
  const noise = encodeBase32(hash, 'Crockford')

  return join(directory, replaceToken(template, noise))
}
