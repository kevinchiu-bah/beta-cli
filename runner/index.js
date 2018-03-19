#!/usr/bin/env node
import program from 'commander';
import process from 'process';
import settings from '../package.json';

import sync from './sync';

const tasks = {
  sync,
}

program.version(settings.version)
  .arguments('<cmd>')
  .action(cmd => {
    tasks[cmd]();
  }).parse(process.argv);
