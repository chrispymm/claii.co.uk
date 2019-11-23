const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');

import { scripts }  from './webpack'
import fonts  from './fonts'
import images  from './images'
import styles  from './styles'

function reset() {
  return src('dist/assets', {allowEmpty: true})
        .pipe(clean({read: false}))
}

function reload() {
  return }


//import { server }  from './server'
//
//const process = series( reset, fonts, images, scripts, styles )

//export images
export const dev =  series( reset, fonts, images, scripts, styles )
export const build = series( reset, fonts, images, scripts, styles )

export default function() {
  watch('src/assets/**/*', { ignoreInitial: false }, dev);
}
