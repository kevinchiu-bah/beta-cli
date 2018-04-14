#! /usr/bin/env node
import * as clear from 'clear';
import * as program from 'commander';
import * as figlet from 'figlet';
import * as path from 'path';
import * as process from 'process';
import * as config from '../config/main.json';
import * as settings from '../package.json';
import { Color } from './enums';
import { logger, help } from './helpers';

program
  .version(settings.version)
  .usage('<command>')
  .arguments('<command>')
  .action(command => {
    clear();
    logger(
      figlet.textSync('B3T4-CLI', { horizontalLayout: 'fitted' }),
      Color.Blue
    );

    if(!config.commands[command] || command === 'help') {
      help();
    } else {
      const fn = require(`./${command}`).default;
      fn();
    }
  });

program.on('--help', () => help());

program.parse(process.argv);
