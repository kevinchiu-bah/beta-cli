#!/bin/sh
":" //# comment; exec /usr/bin/env node --no-warnings "$0" "$@"
require('ts-node/register');
require('./src');
