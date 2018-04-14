#! /usr/bin/env node
import { Chalk } from 'chalk/types';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as path from 'path';
import * as process from 'process';
import * as uchardet from 'uchardet';

import { Iconv } from 'iconv';
import { merge } from 'lodash';

const chalk: Chalk = require('chalk');
const options = {
  fs: {
    bufferSize: 64,
    lowWaterMark: 0,
    highWaterMark: 64,
    autoClose: true,
  },
};

const error = (name) => {
  const message = ([
    chalk.red('[Error]'),
    chalk.cyan(name),
    chalk.grey('is a dependency and needs to be available on your PATH.'),
    chalk.yellow('Exit...')
  ]).join(' ');

  process.exit(1);
};

export const encode = (src: string, locale: string = '', to: string = 'UTF-8') => {
  const params = {
    from: uchardet(src),
    to,
    locale,
  };

  const iconv = new Iconv(params.from, params.to);
  let target = `${src}.backup`;

  const input = fs.createReadStream(src, options.fs);
  const output = fs.createWriteStream(target, { autoClose: true });

  input.pipe(iconv).pipe(output);

  output.on('finish', () => {
    let tmp;
    let ext;

    fs.unlinkSync(src);

    tmp = src;
    ext = path.extname(src);

    src = target;
    target = tmp
      .replace(ext, `.${params.locale}${ext}`)
      .replace(/\.\.+/, '.');

    fs.renameSync(src, target);
  });
};

const init =  () => {
  encode('/Users/kchiu/www/prototypes/node-uchardet/test/resources/sample.ssa');
};

export default init;
