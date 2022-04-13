import type { Options } from 'tsup'

export default <Options>{
  entry: [
    'src/*.ts',
    'src/plugins/*.ts',
  ],
  clean: true,
  format: ['cjs', 'esm'],
  dts: false,
}
