const { src, dest, series, parallel } = require('gulp')
const postcss = require('gulp-postcss');
const postcssimport = require('postcss-import');
const postcsspresetenv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');

export default function styles() {
  const config = (file) => ({
        plugins: [
          postcssimport({ root: file.dirname /* => ./src/css */ }),
          tailwindcss,
          postcsspresetenv
        ]
    });
  //var plugins = [
      //postcssimport({ root: file.dirname }),
      ////tailwindcss,
      //postcsspresetenv
    //];
  return src('src/assets/css/*.css')
    .pipe(postcss(config))
    .pipe(dest('dist/assets/css'));
}

