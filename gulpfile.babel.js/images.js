const { src, dest, series, parallel } = require('gulp');

export default function images() {
  return src('src/assets/images/**/*')
    .pipe(dest('dist/assets/images'))
}
