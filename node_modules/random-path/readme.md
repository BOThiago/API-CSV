# Random Path

Generate a random path name.

## Installation

```sh
npm install --save random-path
```

## Usage

```js
import os from 'node:os'
import randomPath from 'random-path'

const path = randomPath(os.tmpDir(), '%s.txt')

console.log(path)
//=> /tmp/Y374CW8.txt
```

## API

### `randomPath(directory, template)`

- `directory` (`string`, required)
- `template` (`string`, required)
- returns `string` - the generated path

Generates a random path name with the specified `directory` and `template`.

`template` should be a string where `%s` will be replaced with some random characters (e.g. `'linusu-%s'`). The string should contain `%s` exactly once. If you want to include a literal percent sign, escape it with another one, e.g. `'%%string'` becomes `'%string'`.

**Important:** This module makes no guarantees on wether there exists a file at the returned path or not. Do not simply write data to the returned path. If you want a random file, use the higher level module [fs-temp](https://github.com/LinusU/fs-temp).

### `validateTemplate(template)`

- `template` (`string`, required)

Check to see if the template is a valid template accepted by `randomPath`. Throws an error if the template is invalid.

## See also

- [fs-temp](https://github.com/LinusU/fs-temp) - A quick and simple way to create temporary files and directories.
