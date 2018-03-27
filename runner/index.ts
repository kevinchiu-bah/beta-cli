#!/usr/bin/env node
import * as program from 'commander';
import * as process from 'process';
import * as settings from '../package.json';

import { sync } from './sync';

const tasks = {
  sync,
}

program
  .version(settings.version)
  .arguments('<cmd>')
  .action(cmd => {
    const task = tasks[cmd];
    task ? task() : program.help();
  })

program.parse(process.argv);
