const { src, dest, series, parallel } = require('gulp');

const fontDir = 'src/assets/font'

export default function fonts() {
  return src('src/assets/font/**/*')
    .pipe(dest('dist/assets/font'))
}
