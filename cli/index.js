#! /usr/bin/env node
import path from 'path';
import process from 'process';
import program from 'commander';
import { exec, ls } from 'shelljs';

import bundle from './bundle';

const bin = path.resolve(__dirname, '../bin');

process.chdir('./cli');

program
  .version('1.0.0')
  .arguments('<cmd> [options] [target]')
  .option('-i, --input [input]', 'File source path')
  .option('-n, --name [name]', 'Name of media')
  .action(function(cmd, target) {
    switch(cmd) {
      case 'encode':
        const dir = path.resolve(program.input);
        const cmd = `${bin}/encode-th -d ${dir}`;
        exec(cmd);
        break;

      case 'bundle':
        const bundle = require('./bundle').default;
        bundle(target, program);
        break;

       default:
        program.help();
     }
  });

program.on('--help', () => {
  console.log('  Commands:');
  console.log('');
  console.log('    $ beta encode --help [Sanitize text encoding for all *.th.srt (subtitle) files]');
  console.log('    $ beta bundle -h [Bundle and rename subtitle and cover art in directory automatically]');
  console.log('');
});

program.parse(process.argv);
