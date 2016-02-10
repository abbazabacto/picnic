var istanbul = require('browserify-istanbul');
var isparta  = require('isparta');

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS2'],
    frameworks: ['browserify', 'jasmine', 'chai'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['browserify']
    },
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-i18n/angular-locale_nl-nl.js',
      'src/picnic.js',
      //tests
      'src/**/*.spec.js'
    ],
    browserify: {
      debug: true,
      transform: [
        istanbul({
          instrumenter: isparta,
          ignore: ['**/node_modules/**', '**/test/**', '**/*.spec.js']
        }),
        'babelify',
        'browserify-shim'
      ]
    },
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        { type: 'text', subdir: '.', file: 'text.txt' },
        { type: 'json', subdir: '.' },
        { type: 'html', subdir: 'html' }
      ]
    }
  })
};