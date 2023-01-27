/**
 * Generates a random path name with the specified `directory` and `template`.
 *
 * `template` should be a string where `%s` will be replaced with some random characters (e.g. `'linusu-%s'`). The string should contain `%s` exactly once. If you want to include a literal percent sign, escape it with another one, e.g. `'%%string'` becomes `'%string'`.
 *
 * **Important:** This module makes no guarantees on wether there exists a file at the returned path or not. Do not simply write data to the returned path. If you want a random file, use the higher level module [fs-temp](https://github.com/LinusU/fs-temp).
 *
 * @returns the generated path
 */
export default function randomPath (directory: string, template: string): string

/** Check to see if the template is a valid template accepted by `randomPath`. Throws an error if the template is invalid. */
export function validateTemplate (template: string): void
