#! /usr/bin/env node
import path from 'path';
import process from 'process';
import program from 'commander';
import { exec, ls } from 'shelljs';

program.version('1.0.0');

const bin = path.resolve(__dirname, '../bin');

program
  .command('encode-th <src>').alias('encode')
  .description('Sanitize text encoding for all *.th.srt (subtitle) files')
  .action(src => {
    const dir = path.resolve(src);
    const cmd = `${bin}/encode-th -d ${dir}`;
    exec(cmd);
  });

program.parse(process.argv);
