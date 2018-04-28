/// <reference path="../../typings" />
import { default as chalk } from 'chalk';
import { Color } from '../enums';

const print = (options = {}) => {

}

const wrap = (text, color = Color.Gray) => chalk[color](`[${text}] `);

export class Printer {
  static info(message: Message = '', header: string = 'Info') {
    const header = wrap(header, Color.Cyan);
  }

  static success(message: Message = '', header: string = 'Ok') {
    const header = wrap(header, Color.Green);
  }

  static warn(message: Message = '', header: string = 'Warning') {
    const header = wrap(header, Color.Yellow);
  }

  static error(message: Message = '', header: string = 'Error') {
    const header = wrap(header, Color.Red);
    print();
  }
}
