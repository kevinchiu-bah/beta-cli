#! /usr/bin/env node
import { default as chalk } from 'chalk';
import { copyFileSync, createReadStream, createWriteStream, unlinkSync } from 'fs';
import * as glob from 'glob';
import { Iconv } from 'iconv';
import { prompt }from 'inquirer';
import { indexOf, merge } from 'lodash';
import { extname } from 'path';
import { exit } from 'process';
import { echo } from './helpers';

const uchardet = require('uchardet');
const encodings = require('./config/encodings.json');

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

  const backupSrc = src
    .replace(ext, `.backup${ext}`)
    .replace(/\.\.+/, '.');

  // Create Backup
  copyFileSync(src, backupSrc);

  const target = src
    .replace(ext, `.${params.locale}${ext}`)
    .replace(/\.\.+/, '.');

  const input = createReadStream(backupSrc, options.fs);
  const output = createWriteStream(target, { autoClose: true });

  input.pipe(iconv).pipe(output);

  console.log(`${chalk.green('[Encode]')} ${chalk.gray(src)} => ${chalk.cyan(target)}`);

  output.on('finish', () => {
    if(params.backup) {
      console.log(`${chalk.green('[Deleting]')} ${chalk.red(backupSrc)}`);
      unlinkSync(backupSrc);
      cb();
    } else {
      cb();
    }
  });
};

const init =  () => {
  prompt([
    {
      name: 'to',
      message: 'Enter the encoding you would like to convert this to',
      default: 'UTF-8',
      validate: input => {
        const index = indexOf(encodings, input.toUpperCase());
        return (index == -1) ? `"${input.toUpperCase()}" is not valid encoding format` : true;
      },
      filter: input => input.toUpperCase(),
      transformer: input => input.toUpperCase(),
    },
    {
      name: 'path',
      message: 'Enter the path to the file to be encoded',
      validate: input => !!(input || '').length,
    },
  ])
  .then(params => {
    let paths: Array<string>;

    params.path = echo(params.path);

    if(params.paths) {
      Encode(params.path, '', params.to, true);
    } else {
      console.log([
        chalk.red('[Error]'),
        `Could not locate file at ${params.path}!`,
        chalk.yellow('Aborting'),
      ].join(' '));
      exit();
    }
   })
   .catch((e) => {
     console.log(e);
   });
};

export default init;
