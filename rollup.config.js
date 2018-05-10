import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'
import vue from 'rollup-plugin-vue'

export default {
  input: 'src/main.js',
  plugins: [json(), vue(), babel({ exclude: 'node_modules/**' }), process.env.NODE_ENV === 'production' && uglify()],
  output: {
    file: process.env.NODE_ENV === 'production' ? 'dist/vue-simple-maps.min.js' : 'dist/vue-simple-maps.js',
    format: 'cjs'
  }
}
