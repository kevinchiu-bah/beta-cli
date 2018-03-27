#! /usr/bin/env node
import * as colors from 'colors';
import * as fs from 'fs';
import * as process from 'process';
import { exec, exit } from 'shelljs';
import { merge } from 'lodash';

const options = {
  exec: {
    silent: true,
  },

  iconv: {
    to: 'UTF-8',
  }
};

const error = (name) => {
  const message = ([
    colors.red('[Error]'),
    colors.cyan(name),
    colors.grey('is a dependency and needs to be available on your PATH.'),
    colors.yellow('Exit...')
  ]).join(' ');

  console.log(message);
  exit(1);
};

export const encode = (src) => {
  const file = fs.readFileSync(src);

  exec('command -v uchardet', options.exec, (code, stdout, stderr) => {
    if(!stdout.length) {
      error('uchardet');
    }
  });

  exec('command -v iconv', options.exec, (code, stdout, stderr) => {
    if(!stdout.length) {
      error('uchardet');
    }
  });

  exec(`uchardet ${src}`, options.exec, (code, stdout, stderr) => {
    options.iconv.from = (stdout || '').replace(/\n/g, '');

    if(options.iconv.from.length) {
      options.iconv.cmd = `iconv -f ${options.iconv.from} -t ${options.iconv.to} ${src}`;
      exec(options.iconv.cmd, options.exec, (code, stdout, stderr) => {
        fs.writeFileSync(src, stdout);
      });
    } else {
      console.log(`${colors.red('[Error]')} ${colors.yellow(stderr)}`);
    }
  });
};
