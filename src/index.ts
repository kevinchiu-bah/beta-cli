#! /usr/bin/env node
import { default as clear } from 'clear';
import { default as program } from 'commander';
import * as figlet from 'figlet';
import * as path from 'path';
import * as process from 'process';
import { Color } from './enums';
import { logger, help } from './helpers';
const config = require('../config/main.json');
const settings = require('../package.json');

const splash = () => {
  clear();
  logger(
    figlet.textSync('B3T4-CLI', { horizontalLayout: 'fitted' }),
    Color.Blue
  );
};

program
  .version(settings.version, '-v, --version')
  .usage('<command>')
  .arguments('<command>')
  .action(command => {
    splash();

    switch(command) {
      case 'bundle':
      case 'encode':
        const fn = require(`./${command}`).default;
        fn();
        break;

      default:
        help();
        break;
    }
  });

program.on('--help', () => help());

program.parse(process.argv);

if(!program.args.length) {
  splash();
  help();
}
