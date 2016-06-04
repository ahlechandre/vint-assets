var debug = (process.env.NODE_ENV !== "production");
var nodeArgv = process.argv;
var vintEntry /** @type {string | boolean} */;
var vintOutputFilename /** @type {string | boolean} */;
var vintArgvPrefix = '--vint';
var vintArgv = {
  DEFAULT_ENV: vintArgvPrefix + '-default',
  DASHBOARD_ENV: vintArgvPrefix + '-dashboard',
  LOGIN_ENV: vintArgvPrefix + '-login',
};

if (nodeArgv.indexOf(vintArgv.DEFAULT_ENV) !== -1) {
  // DEFAULT ENVIRONMENT.
  vintEntry = './scripts/entry.default.js';
  vintOutputFilename = debug ? 'vint.default.js' : 'vint.default.min.js';
} else if (nodeArgv.indexOf(vintArgv.DASHBOARD_ENV) !== -1) {
  // DASHBOARD ENVIRONMENT.
  vintEntry = './scripts/entry.dashboard.js';
  vintOutputFilename = debug ? 'vint.dashboard.js' : 'vint.dashboard.min.js';  
} else if (nodeArgv.indexOf(vintArgv.LOGIN_ENV) !== -1) {
  // LOGIN ENVIRONMENT.
  vintEntry = './scripts/entry.login.js';
  vintOutputFilename = debug ? 'vint.login.js' : 'vint.login.min.js';
} else {
  console.log('You should provide a valid VINT environment argument: [--vint-default|--vint-dashboard|--vint-login]');
  vintEntry = './scripts/entry.js';
  vintOutputFilename = debug ? 'vint.js' : 'vint.min.js';
} 

module.exports = {
  entry: vintEntry,
  output: {
    filename: vintOutputFilename
  }
};
