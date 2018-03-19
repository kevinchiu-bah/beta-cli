#!/usr/bin/env node
import program from 'commander';
import process from 'process';
import settings from '../package.json';

import sync from './sync';

const tasks = {
  sync,
}

program
  .version(settings.version)
  .arguments('<cmd>')
//.command('sync', 'Sync on \'scripts\' in package.json')
  .action(cmd => {
    const task = tasks[cmd];
    task ? task() : program.help();
  })

program.parse(process.argv);
