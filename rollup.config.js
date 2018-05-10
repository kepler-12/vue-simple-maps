import uglify from 'rollup-plugin-uglify'
import VuePlugin from 'rollup-plugin-vue'

// rollup.config.js
export default {
  input: 'src/main.js',
  plugins: [VuePlugin(), process.env.NODE_ENV === 'production' && uglify()],
  output: {
    file: 'dist/vue-simple-maps.js',
    format: 'cjs'
  }
}
