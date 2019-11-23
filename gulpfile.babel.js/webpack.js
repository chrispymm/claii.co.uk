const path = require('path');
const webpack = require('webpack')

let config = {
  entry: './index.js',
    output: {
        filename: './index.js',
      path: path.resolve(__dirname, '../dist/assets/js')
    },
    context: path.resolve(__dirname, '../src/assets/js')
}

function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }


