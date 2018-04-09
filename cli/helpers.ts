import { ExecOptions } from 'shelljs';
import { Chalk } from 'chalk/types';
import * as _ from 'lodash';
import { Color } from './enums';
import { env } from 'shelljs';

const config = require('../config/main.json');
const chalk: Chalk = require('chalk');

export const logger = (text: string = '', color: Color = Color.Gray) => {
  if(chalk[color]) {
    console.log(chalk[color](text));
  } else {
    console.log(chalk.yellow(`Color: '${color}' is not available for logging!`));
  }
};

const tab: string = '  ';
const padding: number = _
  .chain(config.commands)
  .keys()
  .map(value => value.length)
  .reduce((a: number, b: number) => Math.max(a, b))
  .value() + tab.length;

const pad = (text: string = '') => `${text}${' '.repeat(padding - text.length)}${tab.repeat(2)}`;

export const help = () => {
  const output = [
    null,
    `${tab}Usage: beta <command>`,
    null,
    `${tab}Options:`,
    null,
    `${tab.repeat(2)}-V, --version  output the version number`,
    `${tab.repeat(2)}-h, --help     output usage information`,
    null,
    `${tab}Commands:`,
    null,
  ];

  _.map(config.commands, (description, command) => {
    output.push(`${tab.repeat(2)}${pad(command)}${description}`);
  });

  return console.log(
    output.join('\n')
  );
};

export const echo = (cmd: string = '') => {
  const vars = cmd.match(/\$[a-z0-9]+/ig);
  const options: ExecOptions = {
    silent: true,
  };

  if(vars) {
    vars.forEach(key => {
      const key$ = key.replace(/^\$/g, '');
      const value$ = env[key$];

      if(value$) {
        cmd = cmd.replace(key, value$);
      }
    });
  }

  // Santize the user's path input
  // 1. Remove extra slashes
  // 2. Remove trailing slashes
  cmd = cmd
    .replace(/\/\/+/g, '/')
    .replace(/\/$/g, '');

  return cmd;
}