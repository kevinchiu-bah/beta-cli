#! /usr/bin/env node
import * as colors from 'colors';
import * as path from 'path';
import * as process from 'process';
import * as program from 'commander';

const error = (error) => {
  if(error) {
    console.log(
      colors.red(error)
    );
  } else {
    program.help();
  }
};

program
  .version('1.0.0')
  .arguments('<cmd> [options] [target]')
  .option('-i, --input [input]', 'File source path')
  .option('-n, --name [name]', 'Name of media')
  .action(function(cmd, target) {
    try {
      switch(cmd) {
        case 'encode':
          const encode = require('./encode').encode;
          const file = path.resolve(process.cwd(), target);
          encode(file);
          break;

        case 'bundle':
          const bundle = require('./bundle').default;
          bundle(target, program);
          break;

         default:
          error();
       }
     } catch(e) {
       error(e.message);
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
