import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/main.js',
  plugins: [
    // json and resolve allow rollup to import json files *without* the extension, i.e `import json from './myjsonfile'`.
    // Prevents an issue with jest + babel where imported json _with_ an extension caused issues.
    json(),
    resolve({
      extensions: ['.js', '.json']
    }),
    vue(),
    babel({ exclude: 'node_modules/**', plugins: ['external-helpers'] }),
    process.env.NODE_ENV === 'production' && uglify()
  ],
  output: {
    file: 'dist/vue-simple-maps.min.js',
    format: 'cjs'
  }
}
