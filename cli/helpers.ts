import * as chalk from 'chalk';
import * as _ from 'lodash';
import * as config from '../.config/main.json';
import { Color } from './enums';

export const logger = (text: string = '', color: Color = Color.Gray) => {
  if(chalk[color]) {
    console.log(chalk[color](text));
  } else {
    console.log(chalk.yellow(`Color: '${color}' is not available for logging!`));
  }
};

const tab = '  ';
const padding = _
  .chain(config.commands)
  .keys()
  .map(value => value.length)
  .reduce((a, b) => Math.max(a, b))
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
