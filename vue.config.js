var path = require('path');

var webpack = require('webpack');
var morgan = require('morgan');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  chainWebpack: config => {


    // inject import in all stylus found in the components
    config.plugin('loader').use(webpack.LoaderOptionsPlugin, [{
      options: {
        stylus: {
          import: [resolve('./src/assets/stylus/colors.styl')]
        }
      }
    }]);
  }
};

// {
//   test: /\.html$/,
//   loader: 'vue-html-loader',
//   include: [resolve('src')],
//   exclude: /node_modules/
// }