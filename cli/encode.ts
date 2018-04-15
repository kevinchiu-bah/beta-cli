#! /usr/bin/env node
import { default as chalk } from 'chalk';
import { createReadStream, createWriteStream, unlinkSync } from 'fs';
import { Iconv } from 'iconv';
import { default as inquirer } from 'inquirer';
import { merge } from 'lodash';
import { extname } from 'path';
import { exit } from 'process';

const uchardet = require('uchardet');

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
    chalk.grey('is a dependency and needs to be available on your '),
    chalk.yellow('Exit...')
  ]).join(' ');

  exit(1);
};

export const Encode = (src: string, locale: string = '', to: string = 'UTF-8', backup: boolean = false, cb: Function = () => {}) => {
  const params = {
    from: uchardet(src),
    to,
    locale,
    backup,
  };

  const iconv = new Iconv(params.from, params.to);
  const ext = extname(src);

  const target = src
    .replace(ext, `.${params.locale}${ext}`)
    .replace(/\.\.+/, '.');

  const input = createReadStream(src, options.fs);
  const output = createWriteStream(target, { autoClose: true });

  input.pipe(iconv).pipe(output);

  console.log(`${chalk.green('[Encode]')} ${chalk.gray(src)} => ${chalk.cyan(target)}`);

  output.on('finish', () => {
    if(params.backup) {
      console.log(`${chalk.green('[Deleting]')} ${chalk.red(src)}`);
      unlinkSync(src);
      cb();
    } else {
      cb();
    }
  });
};

const init =  () => {
  // TODO
};

export default init;
