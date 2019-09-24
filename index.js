#!/data/data/com.termux/files/usr/bin/env node
":" //# comment; exec data/data/com.termux/files/usr/bin/env node --no-warnings "$0" "$@"
const tsconfig = {
  project: __dirname + '/tsconfig.json'
};

require('ts-node').register(tsconfig);
require('./src');
