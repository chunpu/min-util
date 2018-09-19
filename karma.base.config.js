module.exports = {
  frameworks: ['mocha'],
  files: ['test/index.js'],
  preprocessors: {
    'test/index.js': ['webpack']
  },
  webpack: {
    module: {
      loaders: []
    }
  },
  webpackMiddleware: {
    noInfo: true // what meaning?
  },
  singleRun: true // what meaning?
}
