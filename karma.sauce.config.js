var _ = require('./src')
var base = require('./karma.base.config')

var extend = Object.assign || _.extend
var keys = Object.keys || _.keys

var launchers = {}

launchers.modern = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7'
  },
  /*
  // fuxk firefox
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox'
  },
  */
  sl_mac_safari: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10'
  }
}

launchers.ie = {
  /*
  // IE6 IE7 is banned in karma@0.13
  sl_ie_6: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows XP',
    version: '6'
  },
  */
  sl_ie_8: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '8'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 10',
    version: '11'
    }
}

/*
launchers.mobile = {
  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },
  sl_android: {
    base: 'SauceLabs',
    browserName: 'android',
    platform: 'Linux',
    version: '4.2'
  }
}
*/

var customLaunchers = extend({}, launchers.modern, launchers.ie, launchers.mobile)

// fast sauce test
/*
customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7'
  }
}
*/

module.exports = function(config) {
  config.set(extend(base, {
    browsers: keys(customLaunchers),
    customLaunchers: customLaunchers,
    // reporters: ['progress', 'saucelabs'],
    // reporters: ['saucelabs'], // progress is fucked in travis
    reporters: ['mocha'],
    sauceLabs: {
      testName: 'min-util unit tests',
      recordScreenshots: false,
      build: process.env.CIRCLE_BUILD_NUM || Date.now()
    },
    captureTimeout: 300 * 1000,
    browserNoActivityTimeout: 300 * 1000
  }))
}
