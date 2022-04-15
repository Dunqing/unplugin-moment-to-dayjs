# unplugin-moment-to-dayjs

[![NPM version](https://img.shields.io/npm/v/unplugin-moment-to-dayjs?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-moment-to-dayjs)

**Replace moment with dayjs, works with all libraries**

## Install

```bash
npm i unplugin-moment-to-dayjs
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import momentTodayjs from 'unplugin-moment-to-dayjs/vite'

export default defineConfig({
  plugins: [
    momentTodayjs({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import momentTodayjs from 'unplugin-moment-to-dayjs/rollup'

export default {
  plugins: [
    momentTodayjs({ /* options */ }),
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-moment-to-dayjs/webpack')({ /* options */ }),
  ],
}
```

<br></details>


### Options

Please reference [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin)

### Thanks

- moment
- dayjs
- antd-dayjs-webpack-plugin