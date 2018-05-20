import { default as chalk } from 'chalk';
import { default as franc } from 'franc';
import * as glob from 'glob';
import { default as Langs } from 'langs';
import * as _ from 'lodash';
import { ExecOptions } from 'shelljs';
import { Color } from './enums';

const config = require('../config/main.json');

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

const pad = (text: string = '') => `${text}${_.repeat(' ', (padding - text.length))}${_.repeat(tab, 2)}`;

export const help = () => {
  const output = [
    null,
    `${tab}Usage: beta <command>`,
    null,
    `${tab}Options:`,
    null,
    `${_.repeat(tab, 2)}-V, --version  output the version number`,
    `${_.repeat(tab, 2)}-h, --help     output usage information`,
    null,
    `${tab}Commands:`,
    null,
  ];

  _.map(config.commands, (description, command) => {
    output.push(`${_.repeat(tab, 2)}${pad(command)}${description}`);
  });

  return console.log(
    output.join('\n')
  );
};

export const echo = (cmd: string = '') => {
  const env = require('shelljs').env;
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

  const paths = glob.sync(`${cmd}/`, { absolute: true });
  const path = (paths.length ? paths[0] : '').replace(/\/$/, '');

  return path;
};

export const detectLocale = (content: string): string => {
  const iso = franc(content);
  const lang = Langs.where('3', iso);

  let locale = null;

  if(lang) {
    locale = lang['1'];
  }

  return locale;
};
