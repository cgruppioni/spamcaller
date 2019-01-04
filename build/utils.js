'use strict'

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  // https://github.com/prograhammer/vue-pizza/wiki/Styles
  // Note: Be careful to only put variables or functions here. If you put a large set of styles here you will find Webpack will take longer to build initially and on hot-reload. An alternative is setting an alias 'stylus': resolve('src/styles/stylus') and then import settings directly into the components you need them: @import '~stylus/1-settings/1-settings.styl'
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus', { 
      preferPathResolver: 'webpack', 
      import: [
        '~@/styles/stylus/1-settings/1-settings.styl', // <-- Load these files into every stylus file.
        '~@/styles/stylus/2-tools/2-tools.styl',       //     Only variables/functions so output CSS is not increased.
      ] 
    }),
    styl: generateLoaders('stylus', { 
      preferPathResolver: 'webpack', 
      import: [
        '~@/styles/stylus/1-settings/1-settings.styl', // <-- Load these files into every stylus file.
        '~@/styles/stylus/2-tools/2-tools.styl',       //     Only variables/functions so output CSS is not increased.
      ] 
    })
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
