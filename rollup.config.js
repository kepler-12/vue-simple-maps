import uglify from 'rollup-plugin-uglify'
import VuePlugin from 'rollup-plugin-vue'

// rollup.config.js
export default {
  input: 'src/main.js',
  plugins: [VuePlugin(), uglify()],
  output: {
    file: 'dist/vue-simple-maps.js',
    format: 'cjs'
  }
}
